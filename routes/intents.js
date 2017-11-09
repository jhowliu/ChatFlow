const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config/database');
const Intent = require('../models/intent');
const Entity = require('../models/entity');

const router = express.Router();

router.get('/:id/entities', (req, res, next) => {
    const intentId = req.params.id;

    Entity.findEntityByIntent(intentId, (err, entities) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to find entities by intentId.', err: err.toString() });
        } else {
          res.json({ success: true, msg: 'Find successfully', data: entities });
        }
    })
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;

    Intent.findIntentById(id, (err, intent) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to read from database', err: err.toString()});
        } else {
            console.log(intent);
            res.json({ success: true, data: intent, msg: 'find successfully' });
        }
    });
});

router.get('/', (req, res, next) => {
    const userid = req.body.userid || req.query.userid;

    Intent.findIntentsByUser(userid, function(err, intents) {
        if (err) {
            res.json({ success: false, msg: 'Failed to read from database', err: err.toString()});
        } else {
            res.json({ success: true, data: intents, msg: 'find successfully' });
        }
    });
});

router.post('/', (req, res, next) => {
    const newIntent = new Intent({
        name: req.body.name,
        userid: req.body.userid,
        sentences: req.body.sentences,
    });

    Intent.addIntent(newIntent, (err, intent) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to add intent', err: err.toString()});
        } else {
            res.json({ success: true, msg: 'Intent added', data: intent });
        }
    });
})

router.put('/', (req, res, next) => {
    const name = req.body.name;
    const intentId = req.body.id;
    const sentences = req.body.sentences;

    Intent.updateIntent(intentId, {
        name: name,
        sentences: sentences
    }, (err, updatedIntent) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to update intent', err: err.toString() });
        } else {
            res.json({ success: true, msg: 'Intent updated', data: updatedIntent });
        }
    });
});

router.delete('/', (req, res, next) => {
    console.log(req.body);
    const intentId = req.body.id;

    Intent.removeIntent(intentId, (err) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to remove intent', err: err.toString() });
        } else {
            res.json({ success: true, msg: 'Intent removed' });
        }
    });
});


module.exports = router;
