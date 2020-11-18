const { User } = require("../../Models");

module.exports = function(req, res, next) {
    let followerId = req.user.id;
    let followeeId = req.query.user_id;

    if (followeeId && followerId) {
        User.isFollowing(followerId, followeeId)
            .then(found => {
                res.data.success = true;
                res.data.is_following = found;
                next();
            }).catch(err => {
                console.error(err);
                res.data.success = false;
                next();
            });
    } else {
        res.data.success = false;
        next();
    }
}