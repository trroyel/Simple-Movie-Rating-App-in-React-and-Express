const express = require('express');

const app = express();
require('./api/init/dbconnect')();

app.use(express.json());
app.use('/api/contents', require('./api/routes/contents'));
app.use('/api/genres', require('./api/routes/genres'));
app.use('/api/categories', require('./api/routes/categories'));
app.use('/api/writers', require('./api/routes/writers'));
app.use('/api/directors', require('./api/routes/directors'));
app.use('/api/languages', require('./api/routes/languages'));
app.use('/api/search', require('./api/routes/search'));

app.use(require('./api/middleware/errorHandler'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Connectiong to port no: ${port}`));
