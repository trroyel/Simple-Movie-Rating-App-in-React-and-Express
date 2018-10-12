const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('from content get...');
});

router.post('/', (req, res) => {
    res.send('from content post...');
});

router.put('/', (req, res) => {
    res.send('from content put ...');
});


router.delete('/', (req, res) => {
    res.send('from content delete...');
});

module.exports = router;