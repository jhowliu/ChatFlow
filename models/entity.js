const mongoose = require('mongoose');
const config = require('../config/database');
const Intent = require('./intent');

const EntitySchema = mongoose.Schema({
    name: {
      type: String,
      require: true
    },
    sentences: {
      type: [String],
      default: []
    },
    _intentId: {
      type: ObjectId,
      ref: Intent
    }
})

const Entity = module.exports = mongoose.model('Entity', EntitySchema);

module.exports.findEntityById = function(id, callback) {
    Entity.findById(id, callback);
}

module.exports.findEntityByIntent = function(intentId, callback) {
    const query = { _intentId: intentId };
    Entity.find(query, callback);
}

module.exports.addEntity = function(newEntity, callback) {
    newEntity.save(callback);
}

module.exports.updateEntity = function(id, updatedEntity, callback) {
    Entity.findById(id, (err, entity) => {
        entity.name = updateEntity.name;
        entity.sentences = updateEntity.sentences;
        entity.save(callback);
    })
}

module.exports.removeEntity = function(id, callback) {
    entity.remove({ _id: id}, callback);
}
