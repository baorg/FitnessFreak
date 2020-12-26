module.exports.UserSerializer = function(users, multiple = false) {

    function single(user) {
        return {
            _id: user._id,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            profile_image: user.profile_image,
            created_at: user.created_at,
            bio: user.bio,
            score: user.score,
        }
    }

    if (users) {
        if (multiple)
            return user.map(user => single(user));
        else
            return singleUser(user);
    } else
        return null;
}