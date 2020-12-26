function logoutHandler(req, res) {
    req.logout();
    res.data.loggedout = true;
}

module.exports = logoutHandler;