const { User } = require("../Models");

module.exports = {
    resource: User,
    options: {
        title: 'userName',
        listProperties: ['_id', 'userName', 'score.totalScore'],
        showProperties: ['userName', 'firstName', 'lastName', 'createdAt', 'googleId', 'facebookId', 'profileImage', 'question', 'answer', 'bio', 'bookmarks', 'followers', 'following', 'score', 'notifications'],
        // editProperties: ['firstName', 'lastName', 'googleId', 'facebookId', 'profileImage', 'question', 'answer', 'bio', 'bookmarks', 'followers', 'following', 'score', 'notifications'],
        // filterProperties: []
    },
};
// ['userName', 'firstName', 'lastName', 'createdAt', 'googleId', 'facebookId', 'profileImage', 'question', 'answer', 'bio', 'bookmarks', 'followers', 'following', 'score', 'notifications']