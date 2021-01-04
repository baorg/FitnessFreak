const googleCallbackHandlerfunction = require('./google');
const facebookCallbackHandlerfunction = require('./facebook');
const logoutHandler = require('./logout');

const LocalAuthHandler = require('./local');

const { requestRestPassword, resetPassword } = require('./Verification/reset_password');
const verifyUserHandler = require('./Verification/verify');
const verifyRequestHandler = require('./Verification/create_verification');

module.exports = {
    googleCallbackHandlerfunction,
    facebookCallbackHandlerfunction,
    logoutHandler,
    LocalAuthHandler,

    requestRestPassword,
    resetPassword,

    verifyRequestHandler,
    verifyUserHandler
};