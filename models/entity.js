const mongoose = require('mongoose');
const Intent = require('./intent');
const User = require('./user');

const EntitySchema = mongoose.Schema({
    name: {
      type: String,
      require: true
    },
    intentId: {
      type: mongoose.Schema.ObjectId,
      require: true
    },
    sentences: {
      type: [String],
      default: []
    },
})

const Entity = module.exports = mongoose.model('Entity', EntitySchema);

// GET by entry_id
module.exports.findEntityById = (id) => {
    return new Promise( (resolve, reject) => {
        Entity.findById(id, (err, entity) => {
            if (err) { reject(err); }
            resolve(entity);
        });
    });
}

// GET by intent_id
module.exports.findEntityByIntentId = (intentId) => {
    const qs = { intentId: intentId };
    return new Promise( (resolve, reject) => {
        Entity.findOne(qs, (err, intent) => {
            if (err) { reject(err); }
            resolve(intent);
        })
    });
}

// POST
module.exports.addEntity = (newEntity) => {
    return new Promise( (resolve, reject) => {
        // create entity in collection
        newEntity.save( (err, entity) => {
            if (err) { reject(err); }
            // add entity_id in intent
            Intent.findIntentById(entity.intentId, (err, intent) => {
                intent.entities.push(entity._id);
                intent.save( (err, intent) => {
                    if (err) { reject(err); }
                    resolve(intent);
                })
            })
        });
    });
}

// UPDATE
module.exports.updateEntity = (id, updateEntity) => {
    return new Promise( (resolve, reject) => {
        Entity.findOneAndUpdate( { _id: id }, {
              name: updateEntity.name,
              sentences: updateEntity.sentences
            }, (err, entity) => {
            if (err) { reject(err); }
            resolve(entity);
        });
    });
}

// DELETE
module.exports.removeEntity = (id) => {
    return new Promise( (resolve, reject) => {
        Intent.findIntentByEntityId(id).then( (intent) => {
            // Remove the entity from intent.entities
            const target = intent.entities.indexOf(id);
            intent.entities.splice(target, 1);
            intent.save( (err, intent) => {
                // remove entity from collection
                if (err) { reject(err); }
                Entity.remove({ _id: id}, (err) => {
                    if (err) { reject(err); }
                    resolve(intent);
                });
            });
        }).catch( (err) => {
            reject(err);
        });
    })
}
