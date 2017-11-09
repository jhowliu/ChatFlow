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
module.exports.findIntentById = (id) => {
    return new Promise( (resolve, reject) => {
        Intent.findById(id, (err, intent) => {
            if (err) { reject(err); }
            resolve(intent);
        });
    });
}

// READ return intent list
module.exports.findIntentsByUser = function(userid, callback) {
    const qs = { userid: userid };
    return new Promise( (resolve, reject) => {
        Intent.find(qs, (err, intent) => {
            if (err) { reject(err); }
            resolve(intent);
        });
    });
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
module.exports.addIntent = (newIntent) => {
    const userid = newIntent.userid;
    return new Promise( (resolve, reject) => {
        User.getUserById(userid).then( (user) => {
            newIntent.save( (err, intent) => {
                if (err) { reject(err); }
                resolve(intent);
            });
        }).catch( (err) => {
          reject(err);
        });
    });
}

// UPDATE
// id: intent id
module.exports.updateIntent = (id, updatedIntent) => {
    return new Promise( (resolve, reject) => {
        Intent.findById(id, (err, intent) => {
            if (err) { reject(err); }
            intent.name = updatedIntent.name;
            intent.sentences = updatedIntent.sentences;
            intent.save( (err, intent) => {
                if (err) { reject(err); }
                resolve(intent);
            });
        });
    });
}

// DELETE
module.exports.removeIntent = (id) => {
    return new Promise( (resolve, reject) => {
        Intent.remove({ _id: id }, (err) => {
            if (err) { reject(err); }
            resolve(true);
        });
    });
}
