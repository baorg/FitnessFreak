const { CLIENT_DOMAIN } = require('../../config');

function logoutHandler(req, res) {
    req.logout();
    res.send({
        loggedout: true,
    })
}

module.exports = logoutHandler;