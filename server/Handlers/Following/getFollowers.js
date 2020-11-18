module.exports = function(req, res, next) {
    res.data.followers = req.user.followers;
    return next();
}