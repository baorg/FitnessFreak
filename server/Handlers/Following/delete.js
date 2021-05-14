const { User } = require("../../Models");

module.exports = function(req, res, next) {
    let followerId = req.user.id;
    let followeeId = req.body.user_id;

    if (followerId && followeeId) {
        User.removeFollowing(followerId, followeeId)
            .then(data => {
                console.log(data);
                res.data.success = true;
                res.data.msg = "Following removed";
                res.data.following = { follower: followerId, followeeId: followeeId };
                return next();
            })
            .catch(err => {
                console.error('ERROR:', err);
                res.data.success = false;
                res.data.error = 'Some internal error.';
                return next();
            });
    } else {
        res.data.success = false;
        res.data.error = "Invalid user-id.";
        return next();
    }
}