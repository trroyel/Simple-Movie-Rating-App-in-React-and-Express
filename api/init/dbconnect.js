const mongoose = require('mongoose');
const dbURL = require('../config/key').URL;
module.exports = function () {
    mongoose.connect(dbURL, { useNewUrlParser: true })
        .then(() => console.log(`connected to ${dbURL}..`))
        .catch(err => console.log(`error occured: ${err.message}`))
};
