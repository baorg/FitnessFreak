const { User } = require('../../Models');

module.exports = async function(req, res, next) {
    user_id = req.params.user;
    user_data = await User.findOne({ _id: user_id })
        .select('followers')
        .populate({ path: 'followers', model: User, options: { select: 'username' } })
        .exec();
    res.data.followers = user_data.followers;
    return next();
}