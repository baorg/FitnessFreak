const { User } = require('../../Models');

function addFollowing(req, res, next) {
    let followerId = req.user.id;
    let followeeId = req.body.user_id;
    if (followerId && followeeId) {
        User.addFollowing(followerId, followeeId)
            .then(data => {
                res.data.success = true;
                res.data.is_following = true;
                res.data.msg = "Following added";
                res.data.following = data;
                // console.log(res.data);
                return next();
            })
            .catch(err => {
                console.error('ERROR:', err);
                res.data.success = false;
                return next();
            });
    } else {
        res.data.success = false;
        res.data.error = 'Data not sufficient.';
        return next();
    }
}

module.exports = addFollowing;