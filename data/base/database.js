// require libraries
const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-node');


// connect mongoose
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('We are connected to the database!')
});

var Schema = mongoose.Schema;
var userSchema = new Schema({
    name: String,
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    admin: Boolean,
    location: String,
    timestamps: {createdAt: Date, updatedAt: Date}
});

var User = mongoose.model('User', userSchema);


module.exports = User;