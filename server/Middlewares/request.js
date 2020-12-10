function initRequest(req, res, next) {
    if (!req.isAuthenticated()) {
        res.data = {};
    } else {
        res.data = {};
    }
    return next();
}

module.exports = initRequest;