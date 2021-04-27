const { User } = require('../../Models');
const mongoose = require('mongoose');
module.exports = async function(req, res, next) {
    let user_id = req.params.userId;
    user_id = mongoose.Types.ObjectId(user_id);

    let user_data = await User.aggregate([
            { $match: { _id: user_id } },
            {
                $project: {
                    followers: { $size: '$followers' },
                    followings: { $size: '$following' }
                }
            }
        ])
        .exec();
    // console.log('User: ', user_data);
    if (user_data.length > 0) {
        res.data.success = true;
        res.data.valid_user = true;
        res.data.followers = user_data[0].followers;
        res.data.followings = user_data[0].followings;
    } else {
        res.data.success = false;
        res.data.valid_user = true;
        res.data.error = "Invalid user";
        res.data.followers = null;
    }
    return next();
}