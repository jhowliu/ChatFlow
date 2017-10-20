const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});


// Variable using from outside
const User = module.exports = mongoose.model('User', UserSchema);


module.exports.getUserById = function(id, callback) {
    User.findById(id, callback) 
}

module.exports.getUserById = function(username, callback) {
    const query = { username: username }
    User.findOne(query, callback) 
}


// Add User 
// bcrypt: hash the user password
module.exports.addUser = function(newUser, callback) {
    bcrypt.ganSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hasd) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}
