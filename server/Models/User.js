const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");

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
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ques' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    score: { totalScore: { type: Number, default: 0 } },
    notifications: []
});
userSchema.statics.getUserData = async function(userId) {
    let user = await this.findOne({ _id: mongoose.Types.ObjectId(userId) }).select(['userName', 'firstName', 'lastName', 'createdAt', 'profileImage', 'bio'])
        .exec();
    return user;
}

userSchema.statics.isFollowing = async function(followerId, followeeId) {

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

userSchema.statics.addFollowing = async function(followerId, followeeId) {
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

userSchema.statics.removeFollowing = async function(followerId, followeeId) {
    followeeId = mongoose.Types.ObjectId(followeeId);
    followerId = mongoose.Types.ObjectId(followerId);
    let deleteFollower = await this.updateOne({ _id: followerId }, { $pull: { following: followeeId } }).exec();
    let deleteFollowee = await this.updateOne({ _id: followeeId }, { $pull: { followers: followerId } }).exec();
}

userSchema.plugin(findOrCreate);
const User = new mongoose.model("User", userSchema);

module.exports = { userSchema, User };