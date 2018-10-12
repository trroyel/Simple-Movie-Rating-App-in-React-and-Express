const express = require('express');
const mongoose = require('mongoose');
const contents = require('./api/routes/contents');


const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to my first app.');
});

app.use(express.json());
app.use('/api/content', contents);

app.listen(process.env.PORT || 3000, () => console.log('Connectiong to port no..'));
