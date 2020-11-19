const { User } = require('../../Models');

module.exports = function(req, res, next) {
    return res.send(req.user);
}