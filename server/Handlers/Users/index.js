const { searchUserHandler, getSuggestions } = require('./search');
const getUserDataHandler = require('./getUserData');
const getUserFromIdHandler = require('./getUserFromId');
const getUserFromUsernameHandler = require('./getUserFromUsername');
const updateHandlers = require('./update');
const verifyHandlers = require('./verify');

module.exports = {
    searchUserHandler,
    getUserDataHandler,
    getUserFromIdHandler,
    getUserFromUsernameHandler,
    updateHandlers,
    verifyHandlers,
    getSuggestions
}