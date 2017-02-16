// Require database User
const User = require('./database.js');


// create new user

bcrypt.hash('password1', null, null, (err, hash) => {
    var Ilana = new User({
        name: "Ilana",
        username: 'ilanabanana',
        password: hash,
        admin: true
    })
})

var Ilana = new User({
    name: "Ilana",
    username: 'ilanabanana',
    password: hash,
    admin: true
})