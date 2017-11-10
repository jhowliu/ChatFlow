const express = require('express');

const config = require('../config/database');
const Entity = require('../models/entity');

const router = express.Router();

router.get('/:id', (req, res) => {
    const entityId = req.params.id || req.params.entityId;
    Entity.findEntityById(entityId).then( (entity) => {
        res.json({ success: true, msg: 'Read successfully', data: entity });
    }).catch( (err) => {
        res.json({ success: false, msg: 'Failed to read from database.', err: err.toString()});
    });
});

router.get('/', (req, res) => {
    const intentId = req.query.id || req.query.intentId;
    Entity.findEntityByIntentId(intentId).then( (entities) => {
        res.json({ success: true, msg: 'Find successfully', data: entiies });
    }).catch( (err) => {
        res.json({ success: false, msg: 'Failed to read from database.', err: err.toString() });
    });
});

router.post('/', (req, res) => {
    const newEntity = new Entity({
        name: req.body.name,
        sentences: req.body.sentences,
        intentId: req.body.intentId,
    });
    Entity.addEntity(newEntity).then( (entity) => {
        res.json({ success:true, msg: 'Entity added.', data: entity })
    }).catch( (err) => {
        res.json({ success:false, msg: 'Failed to add entity.', err: err.toString() })
    });
})

router.delete('/', (req, res) => {
    const entityId = req.body.id || req.body.entityId;
    Entity.removeEntity(entityId).then( (intent) => {
        res.json({ success: true, msg: 'Intent removed', data: intent });
    }).catch( (err) => {
        res.json({ success: false, msg: 'Failed to remove intent', err: err.toString() });
    });
});

router.put('/', (req, res) => {
    const entityId = req.body.id || req.body.entityId;
    const name = req.body.name;
    const sentences = req.body.sentences;

    Entity.updateEntity(entityId, {
        name: name,
        sentences: sentences
    }).then( (updatedEntity) => {
        res.json({ success: true, msg: 'Entity updated', data: updatedEntity });
    }).catch( (err) => {
        res.json({ success: false, msg: 'Failed to update entity.', err: err.toString()});
    });
});


module.exports = router;
