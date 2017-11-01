const mongoose = require('mongoose');
const config = require('../config/database');
const User = require('./user');
const Entity = require('./entity');

const IntentSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    userid: {
        type: String,
        require: true
    },
    entities: [{
        type: ObjectId,
        ref: Entity // population
    }],
    sentences: {
        type: [String],
        default: []
    }
});

const Intent = module.exports = mongoose.model('Intent', IntentSchema);


// return an intent using intent id
module.exports.findIntentById = function(id, callback) {
    Intent.findById(id, callback);
}

// READ return intent list
module.exports.findIntentsByUser = function(userid, callback) {
    const query = { userid: userid };
    Intent.find(query, callback);
}

// CREATE
module.exports.addIntent = function(newIntent, callback) {
    const userid = newIntent.userid;
    User.getUserById(userid, (err, user) => {
        if (user) {
            newIntent.save(callback);
        } else {
            console.log('user not found');
            callback(true, 'user not found');
        }
    });
}

// UPDATE
// id: intent id
module.exports.updateIntent = function(id, updatedIntent, callback) {
    Intent.findById(id, (err, intent) => {
        intent.name = updatedIntent.name;
        intent.sentences = updatedIntent.sentences;
        intent.save(callback);
    })
}

// DELETE
module.exports.removeIntent = function(id, callback) {
    Intent.remove({ _id: id }, callback);
}
