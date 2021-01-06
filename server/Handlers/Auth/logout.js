function logoutHandler(req, res, next) {
    req.logout();
    res.data.loggedout = true;
    res.data.success = true;
    return next();
}

module.exports = logoutHandler;