const mongoose = require('mongoose');
const User = require('./user');

const IntentSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    userid: {
        type: String,
        require: true
    },
    entities: {
        type: [mongoose.Schema.ObjectId],
        default: [],
    },
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
    const qs = { userid: userid };
    Intent.find(qs, callback);
}

module.exports.findIntentByEntityId = (entityId) => {
    const qs = { 'entities': { '$in': [entityId] } };
    return new Promise( (resolve, reject) => {
        Intent.findOne(qs, (err, intent) => {
            if (err) { reject(err); }
            resolve(intent);
        });
    });
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
