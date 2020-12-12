const mongoose = require("mongoose");
const findOrCreate = require("mongoose-findorcreate");
const passportLocalMongoose = require("passport-local-mongoose");

const {
    getUserData,
    isFollowing,
    addFollowing,
    removeFollowing,
    findUserByEmail,
    findUserByUserName,
    getUniqueUsername,
    findUserByUserId
} = require("./statics");

const {
    getAllQuestionsOfFollowings,
    refreshFeed,
    getFeed
} = require('./methods');

const userSchema = require("./schema");

userSchema.statics = {
    getUserData,
    isFollowing,
    addFollowing,
    removeFollowing,
    findUserByEmail,
    findUserByUserName,
    getUniqueUsername,
    findUserByUserId
};

userSchema.methods = {
    getAllQuestionsOfFollowings,
    refreshFeed,
    getFeed
}


userSchema.plugin(findOrCreate);
userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

module.exports = { userSchema, User };