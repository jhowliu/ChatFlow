const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config/database');
const User = require('../models/user');

const router = express.Router();

// Register
router.post('/register', (req, res, next) => {
    console.log(req.body);
    let newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        name: req.body.name,
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            console.log(err);
            res.json({ success: false, msg: 'Failed to register user' });
        } else {
            console.log(user);
            res.json({ success: true, msg: 'User registered' });
        };
    });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username).then( (user) => {
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
                // Need to convert user doc into plain object.
                const token = jwt.sign(user.toObject(), config.secret, {
                    expiresIn: '1h' // 1 week
                });

                res.json({
                    success: true,
                    token: 'Bearer ' + token,
                    msg: 'Enjoy your token',
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    },
                });
            } else {
                return res.json({ success: false, msg: 'Wrong password' });
            }
        });
    }).catch( (err) => {
        return res.json({ success: false, msg: 'authenticate error.', err: err.toString() });
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});

// Validate: See the user token if it is matched
router.get('/validate', (req, res, next) => {
    res.send('VALIDATE');
});

module.exports = router;
