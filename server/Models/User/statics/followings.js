const mongoose = require('mongoose');
const {addScore} = require("../../../Handlers/Question/utilis")
const {score} = require("../../../config/score")
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
            const user = await this.findById(followeeId).exec();
            addScore(user, "totalScore", score.followerGained );
            addScore(user, "followers", score.followerGained);
            const username = await this.findUserByUserId(followerId)
            user.notifications.push(`${username} has started following you`)
            await user.save();
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
    const user = await this.findById(followeeId).exec();
    addScore(user, "totalScore", -score.followerGained);
    addScore(user, "Followers", -score.followerGained);
    const username = await this.findUserByUserId(followerId)
    user.notifications.push(`${username} has unfollowed you`)
    await user.save();
}

module.exports = {
    isFollowing,
    removeFollowing,
    addFollowing
}