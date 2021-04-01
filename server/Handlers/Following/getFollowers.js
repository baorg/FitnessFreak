const { User } = require('../../Models');

module.exports = async function(req, res, next) {
    user_id = req.params.user;
    // console.log('User Id', user_id);
    user_data = await User.findOne({ _id: user_id })
        .select('followers')
        .populate({
            path: 'followers',
            model: User,
            options: { select: 'username profile_image first_name last_name' }
        })
        .exec();
    // console.log('User: ', user_data);
    if(user_data){
        res.data.success = true;
        res.data.valid_user = true;
        res.data.followers = user_data.followers;
    }else{
        res.data.success = false;
        res.data.valid_user = true;
        res.data.error = "Invalid user";
        res.data.followers = null;
    }
    return next();
}