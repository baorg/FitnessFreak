const { User } = require("../../../Models");

module.exports = {
    resource: User,
    options: {
        title: 'username',
        listProperties: ['_id', 'username', 'score.totalScore'],
        // showProperties: ['username', 'first_name', 'last_name', 'created_at', 'google_id', 'google_setup', 'facebook_id', 'profile_image', 'question', 'answer', 'bio', 'bookmarks', 'followers', 'following', 'score.totalScore', 'notifications'],
        // editProperties: ['first_name', 'last_name', 'googleId', 'facebookId', 'profileImage', 'question', 'answer', 'bio', 'bookmarks', 'followers', 'following', 'score', 'notifications'],
        // filterProperties: []
    },
};
// ['userName', 'first_name', 'last_name', 'createdAt', 'googleId', 'facebookId', 'profileImage', 'question', 'answer', 'bio', 'bookmarks', 'followers', 'following', 'score', 'notifications']