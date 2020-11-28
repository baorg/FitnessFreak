const { getUserData, getUniqueUsername, findUserByEmail, findUserByUserName } = require('./userdata');
const { isFollowing, addFollowing, removeFollowing } = require('./followings');

module.exports = {
    getUserData,
    getUniqueUsername,
    findUserByEmail,
    findUserByUserName,
    isFollowing,
    addFollowing,
    removeFollowing
}