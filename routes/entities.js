const express = require('express');

const config = require('../config/database');
const Entity = require('../models/entity');

const router = express.Router();

router.get('/:id', (req, res, next) => {
    const id = req.params.id;

    Entity.findEntityById(id, (err, entity) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to read from database.', err: err.toString()});
        } else {
            res.json({ success: true, msg: 'Read successfully', data: entity });
        }
    })
});

router.post('/', (req, res, next) => {
    const newEntity = new Entity({
        name: req.body.name,
        sentences: req.body.sentences,
        intentId: req.body.intentId,
    });

    Entity.addEntity(newEntity, (err, entity) => {
        if (err) {
          res.json({ success:false, msg: 'Failed to add entity.', err: err.toString() })
        } else {
          res.json({ success:true, msg: 'Entity added.', data: entity })
          console.log(entity);
        }
    })
})

router.delete('/', (req, res, next) => {
    const entityId = req.body.id;
    Entity.removeEntity(entityId, (err, intent) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to remove intent', err: err.toString() });
        } else {
            res.json({ success: true, msg: 'Intent removed', data: intent });
        }
    });
});

router.put('/', (req, res, next) => {
    const entityId = req.body.id;
    const name = req.body.name;
    const sentences = req.body.sentences;

    Entity.updateEntity(entityId, {
        name: name,
        sentences: sentences
    }, (err, updatedEntity) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to update entity.', err: err.toString()});
        } else {
            res.json({ success: true, msg: 'Entity updated', data: updatedEntity });
        }
    });
});


module.exports = router;
