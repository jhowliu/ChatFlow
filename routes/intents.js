const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config/database');
const Intent = require('../models/intent');
const Entity = require('../models/entity');

const router = express.Router();

router.get('/:id/entities', (req, res, next) => {
    const intentId = req.params.id;
    Entity.findEntityByIntentId(intentId).then( (entities) => {
        res.json({ success: true, msg: 'Find successfully', data: entities });
    }).catch( (err) => {
        res.json({ success: false, msg: 'Failed to find entities by intentId.', err: err.toString() });
    });
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Intent.findIntentById(id).then( (intent) => {
        res.json({ success: true, data: intent, msg: 'find successfully' });
    }).catch( (err) => {
        res.json({ success: false, msg: 'Failed to read from database', err: err.toString()});
    });
});

router.get('/', (req, res, next) => {
    const userid = req.body.userid || req.query.userid;
    Intent.findIntentsByUser(userid).then( (intents) => {
        res.json({ success: true, data: intents, msg: 'find successfully' });
    }).catch( (err) => {
        res.json({ success: false, msg: 'Failed to read from database', err: err.toString()});
    });
});

router.post('/', (req, res, next) => {
    const newIntent = new Intent({
        name: req.body.name,
        userid: req.body.userid,
    });
    Intent.addIntent(newIntent).then( (intent) => {
        res.json({ success: true, msg: 'Intent added', data: intent });
    }).catch( (err) => {
        res.json({ success: false, msg: 'Failed to add intent', err: err.toString()});
    });
})

router.put('/', (req, res, next) => {
    const name = req.body.name;
    const intentId = req.body.id;
    const sentences = req.body.sentences;
    Intent.updateIntent(intentId, {
        name: name,
        sentences: sentences
    }).then( (updatedIntent) => {
        res.json({ success: true, msg: 'Intent updated', data: updatedIntent });
    }).catch( (err) => {
        res.json({ success: false, msg: 'Failed to update intent', err: err.toString() });
    });
});

router.delete('/', (req, res, next) => {
    const intentId = req.body.id;
    Intent.removeIntent(intentId).then( () => {
        res.json({ success: true, msg: 'Intent removed' });
    }).catch( (err) => {
        res.json({ success: false, msg: 'Failed to remove intent', err: err.toString() });
    });
});

module.exports = router;
