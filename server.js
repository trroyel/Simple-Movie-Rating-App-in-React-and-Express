const express = require('express');
const contents = require('./api/routes/contents');
const genres = require('./api/routes/genres');
const categories = require('./api/routes/categories');
const directors = require('./api/routes/directors');
const writers = require('./api/routes/writers');
const languages = require('./api/routes/languages');

const app = express();
require('./api/init/dbconnect')();

app.use(express.json());
app.use('/api/contents', contents);
app.use('/api/genres', genres);
app.use('/api/categories', categories);
app.use('/api/writers', writers);
app.use('/api/directors', directors);
app.use('/api/languages', languages);

app.get('/', (req, res) => {
    res.send('Welcome to Movie Rating app.');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Connectiong to port no: ${port}`));
