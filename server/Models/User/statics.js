const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: String,
    firstName: String,
    lastName: String,
    createdAt: Date,
    googleId: String,
    facebookId: String,
    profileImage: String,
    question: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ques' }],
    answer: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ans' }],
    bio: String,
    bookmarks: [],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    score: { totalScore: { type: Number, default: 0 } },
    notifications: []
});

async function getUserData(user_id) {
    let user = await this.findOne({ _id: mongoose.Types.ObjectId(user_id) }).select(['username', 'first_name', 'last_name', 'created_at', 'profile_image', 'bio'])
        .exec();
    return user;
}

async function isFollowing(followerId, followeeId) {
    let follower = await this.findOne({ _id: followerId, following: { $in: [followeeId] } })
        .select([]).exec();
    let followee = await this.findOne({ _id: followeeId, followers: { $in: [followerId] } })
        .select([]).exec();

    if (followee && follower)
        return true;
    else {
        if (follower || followee)
            await this.removeFollowing(followerId, followeeId);
        return false;
    }
}

async function addFollowing(followerId, followeeId) {
    let follower = await this.getUserData(mongoose.Types.ObjectId(followerId));
    let followee = await this.getUserData(mongoose.Types.ObjectId(followeeId));
    if (followee && follower) {
        let alreadyFollowing = await this.isFollowing(followerId, followeeId);
        if (!alreadyFollowing) {
            const updateFollower = await this.updateOne({ _id: followerId }, { $push: { following: followeeId } }).exec();
            const updateFollowee = await this.updateOne({ _id: followeeId }, { $push: { followers: followerId } }).exec();
        }
        return { follower, followee };
    } else {
        throw Error(`${follower}-${followee} addfollowing`);
    }
}

async function removeFollowing(followerId, followeeId) {
    followeeId = mongoose.Types.ObjectId(followeeId);
    followerId = mongoose.Types.ObjectId(followerId);
    let deleteFollower = await this.updateOne({ _id: followerId }, { $pull: { following: followeeId } }).exec();
    let deleteFollowee = await this.updateOne({ _id: followeeId }, { $pull: { followers: followerId } }).exec();
}

async function findUserByEmail(email) {
    let user = await this.findOne({ email }).select(['username', 'email']).exec();
    return user;
}

async function findUserByUserName(username) {
    let user = await this.findOne({ username: username }).select(['username', 'email']).exec();
    return user;
}

function getRandInt(digits) {
    res = "";
    for (var i = 0; i < digits; i++)
        res += '5678901324' [(Math.random() * 10).toFixed(0) % 10];
    return res;
}

async function getUniqueUsername(username) {
    username = username.toLowerCase().replace(/\W/gi, '_');
    let newUsername = username;
    while (await this.findUserByUserName(newUsername)) {
        newUsername = username + getRandInt(4);
    }
    return newUsername;
}

module.exports = {
    getUserData,
    isFollowing,
    addFollowing,
    removeFollowing,
    findUserByEmail,
    findUserByUserName,
    getUniqueUsername
}