// Require library
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-node');


// Create Schema
var userSchema = new mongoose.Schema({
    username:{type: String, unique: true},
    password:String
});

// Encryption
userSchema.pre('save', function(next){
    var user = this;
    if(user.isModified('password')){
        bcrypt.hash(user.password, null, null, function(err, hash){
            if (err){
                next();
            }
            user.password = hash;
            next();
        });
    }
    next();
});

// Compare encryption
userSchema.methods.comparePassword = function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
        callback(isMatch);
    });
};
var User = mongoose.model('users', userSchema);


// Connect to Mongodb
mongoose.connect('mongodb://localhost/mongoose-bcrypt-test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('We are connected to the database!')
});

// CREATE TEST USER
var testUser = new User({
    name: "Yara Enderman",
    username: 'yaartje',
    password: 'password123',
    admin: true
});

// SAVE user to database
testUser.save(function(err, data){
    if(err) console.log(err);
    else console.log ('Sucess:' , data);
});

//Export database
module.exports = User;