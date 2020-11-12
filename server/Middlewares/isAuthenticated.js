function isAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        console.log("authentication error = ")
        return res.send({ isAuthenticated: false, error: 'Not authenticated' });
    } else
        next();
}

module.exports = isAuthenticated;