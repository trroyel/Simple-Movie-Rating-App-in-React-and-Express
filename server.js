const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');

const app = express();
require('./api/init/dbconnect')();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(helmet());
app.use(compression());

app.use('/api/contents', require('./api/routes/contents'));
app.use('/api/genres', require('./api/routes/genres'));
app.use('/api/categories', require('./api/routes/categories'));
app.use('/api/writers', require('./api/routes/writers'));
app.use('/api/directors', require('./api/routes/directors'));
app.use('/api/languages', require('./api/routes/languages'));
app.use('/api/search', require('./api/routes/search'));
app.use('/*', require('./api/routes/404'));

app.use(require('./api/middleware/errorHandler'));


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Connectiong to port no: ${port}`));
