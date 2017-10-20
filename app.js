const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

const users = require('./routes/users');
const config = require('./config/database');

// Connect To Tatabase
mongoose.connect(config.database);

// Connection On Listener
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

// Connection Error Listener
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

const app = express();

// Set Static Folder
app.set(express.static(path.join(__dirname, 'public')));

// Setting Port Number
app.set('port', 4567);

// Allow Cross-origin resource sharing middleware
app.use(cors());

// Body Parser Midderware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// use the path which is users, will direct to users.js
app.use('/users', users);

app.get('/', (req, res) => {
    res.send('Invaild Endpoint');
});


app.listen(app.get('port'), () => {
    console.log('Server start at port on ' + app.get('port'));
});
