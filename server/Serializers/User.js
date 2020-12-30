function UserSerializer(users, multiple = false) {

    function single(user) {
        return {
            _id: user._id,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            profile_image: user.profile_image,
            is_verified: user.is_verified,
            created_at: user.created_at,
            bio: user.bio,
            score: user.score.length === 0 ? [{ name: "totalScore", score: 0 }] : user.score,
        }
    }

    if (users) {
        if (multiple)
            return users.map(user => single(user));
        else
            return single(users);
    } else
        return null;
}

function editProfileUserSerializer(user) {
    let user_data = UserSerializer(user, false);

    user_data = {
        ...user_data,
        email: user.email ? {
            email: user.email,
            verified: user.email_verified
        } : null,
    };

    return user_data;
}


module.exports = {
    editProfileUserSerializer,
    UserSerializer
}