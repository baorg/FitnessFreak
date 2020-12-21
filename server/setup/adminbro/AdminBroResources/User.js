const { User } = require("../../../Models");

module.exports = {
    resource: User,
    options: {
        title: 'username',
        listProperties: ['_id', 'username', 'is_verified'],
        showProperties: ['_id', 'username', 'is_verified', 'first_name', 'last_name', 'created_at', 'google_id', 'google_setup', 'facebook_id', 'profile_image', 'bio', 'bookmarks', 'followers', 'following'],
        editProperties: ['_id', 'username', 'is_verified', 'first_name', 'last_name', 'googleId', 'facebookId', 'profileImage', 'bio', 'bookmarks', 'score'],
        // filterProperties: []
    },
};
// ['userName', 'first_name', 'last_name', 'createdAt', 'googleId', 'facebookId', 'profileImage', 'question', 'answer', 'bio', 'bookmarks', 'followers', 'following', 'score', 'notifications']