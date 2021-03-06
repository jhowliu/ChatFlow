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


module.exports.getUserById = (id) => {
  return new Promise( (resolve, reject) => {
      User.findById(id, (err, user) => {
          if (err) { reject(err); }
          if (user) {
            resolve(user);
          } else {
            reject('user not found.');
          }
      });
  })
}

module.exports.getUserByUsername = (username) => {
    const qs = { username: username };
    return new Promise( (resolve, reject) => {
        User.findOne(qs, (err, user) => {
            if (err) { reject(err); }
            if (user) {
                resolve(user);
            } else {
                reject('user not found.');
            }
        });
    });
}

// Add User
// bcrypt: hash the user password
module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = function(password, hash, callback) {
    bcrypt.compare(password, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}
