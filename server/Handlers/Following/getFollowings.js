const { User } = require('../../Models');

module.exports = async function(req, res, next) {
    user_id = req.params.user;
    user_data = await User.findOne({ _id: user_id })
        .select('following')
        .populate({ path: 'following', model: User, options: { select: 'userName' } })
        .exec();
    res.data.following = user_data.following;
    return next();
}