const { getUserData, getUniqueUsername, findUserByEmail, findUserByUserName,findUserByUserId } = require('./userdata');
const { isFollowing, addFollowing, removeFollowing } = require('./followings');

module.exports = {
    getUserData,
    getUniqueUsername,
    findUserByEmail,
    findUserByUserName,
    isFollowing,
    addFollowing,
    removeFollowing,
    findUserByUserId
}