const getGoogleStrategy = require('./google');
const getFacebookStrategy = require('./facebook');
const getLocalStrategy = require('./local');

module.exports = {
    getLocalStrategy,
    getGoogleStrategy,
    getFacebookStrategy
}