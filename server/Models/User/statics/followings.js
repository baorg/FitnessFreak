const mongoose = require('mongoose');

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

module.exports = {
    isFollowing,
    removeFollowing,
    addFollowing
}