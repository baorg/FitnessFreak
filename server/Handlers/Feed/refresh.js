module.exports = async function(req, res, next) {
    user = req.user;
    await user.refreshFeed();
    res.data = { feed: 'refreshed' };
    return next();
}