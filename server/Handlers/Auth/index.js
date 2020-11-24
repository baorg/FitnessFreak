const { googleCallbackHandlerfunction } = require('./google');
const logoutHandler = require('./logout');
const LocalAuthHandler = require('./local');

module.exports = {
    googleCallbackHandlerfunction,
    logoutHandler,
    LocalAuthHandler
};