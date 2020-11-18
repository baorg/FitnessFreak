module.exports = function(req, res, next) {
    res.data.following = req.user.following;
    return next();
}