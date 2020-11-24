const mongooseSetup = require('./mogoose');
const passportSetup = require('./passport');
const adminbroSetup = require('./adminbro');

module.exports = {
    mongooseSetup,
    passportSetup,
    adminbroSetup
};