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

module.exports.findEntityById = function(id, callback) {
    Entity.findById(id, callback);
}

module.exports.findEntityByIntent = function(intentId, callback) {
    const query = { _intentId: intentId };
    Entity.find(query, callback);
}

module.exports.addEntity = (newEntity, callback) => {
    newEntity.save( (err, entity) => {
        if (err) throw err;
        Intent.findIntentById(entity.intentId, (err, intent) => {
            intent.entities.push(entity._id);
            intent.save(callback);
        });
    });
}

module.exports.updateEntity = function(id, updatedEntity, callback) {
    Entity.findById(id, (err, entity) => {
        entity.name = updateEntity.name;
        entity.sentences = updateEntity.sentences;
        entity.save(callback);
    })
}

module.exports.removeEntity = (id, callback) => {
    Entity.remove({ _id: id}, callback);
}
