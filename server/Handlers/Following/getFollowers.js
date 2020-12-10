const { User } = require('../../Models');

module.exports = async function(req, res, next) {
    user_id = req.params.user;
    console.log('User Id', user_id);
    user_data = await User.findOne({ _id: user_id })
        .select('followers')
        .populate({ path: 'followers', model: User, options: { select: 'username' } })
        .exec();
    console.log('User: ', user_data);
    res.data.followers = user_data.followers;
    return next();
}