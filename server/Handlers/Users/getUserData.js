const { User } = require('../../Models');

module.exports = function(req, res, next) {
    return res.send({ isAuthenticated: true, user: req.user });
}