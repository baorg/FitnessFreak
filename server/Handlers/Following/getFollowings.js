const { User } = require('../../Models');

module.exports = async function(req, res, next) {
    user_id = req.params.user;
    user_data = await User.findOne({ _id: user_id })
        .select('following')
        .populate({
            path: 'following',
            model: User,
            options: { select: 'username profile_image first_name last_name is_verified' }
        })
        .exec();
    // console.log('User:', user_data);
    if (user_data) {
        res.data.success = true;
        res.data.valid_user = true;
        res.data.following = user_data.following;
    } else {
        res.data.success = false;
        res.data.valid_user = true;
        res.data.error = "Invalid user";
        res.data.following = null;
    }


    return next();
}