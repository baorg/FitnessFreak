function isAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        console.log("authentication error = ");
        return res.send({ isAuthenticated: false, error: 'Not authenticated' });
    } else {
        res.data = { isAuthenticated: true };
        next();
    }
}

module.exports = isAuthenticated;