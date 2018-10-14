const express = require('express');
const { Language } = require('../models/language');
const validateObjectId = require('../middleware/validateObjectId');
const asyncErrorHandler = require('../middleware/asyncErrorHandler');

const router = express.Router();

router.get('/', asyncErrorHandler(async (req, res) => {
    const languages = await Language.find();
    if (languages.length === 0) res.status(404).send('no language found!');
    res.send(languages);
}));

router.get('/:id', validateObjectId, asyncErrorHandler(async (req, res) => {
    const language = await Language.findById(req.params.id);
    if (!language) res.status(404).send('no language find by the given id!');
    res.send(language);
}));

router.post('/', asyncErrorHandler(async (req, res) => {
    const language = new Language({
        name: req.body.name,
        country: req.body.country
    });

    const result = await language.save();
    res.send(result);
}));

router.put('/:id', validateObjectId, asyncErrorHandler(async (req, res) => {
    const language = await Language.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!language) res.status(404).send('no language is found by thr given id!');
    res.send(language);
}));

router.delete('/:id', validateObjectId, asyncErrorHandler(async (req, res) => {
    const language = await Language.findByIdAndRemove(req.params.id);
    if (!language) res.status(404).send('No language found by the given id !!');
    res.send(language);
}));

module.exports = router;