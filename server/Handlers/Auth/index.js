const googleCallbackHandlerfunction = require('./google');
const facebookCallbackHandlerfunction = require('./facebook');
const logoutHandler = require('./logout');

const LocalAuthHandler = require('./local');

module.exports = {
    googleCallbackHandlerfunction,
    facebookCallbackHandlerfunction,
    logoutHandler,
    LocalAuthHandler
};