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
    getUniqueUsername
} = require("./statics");

const userSchema = require("./schema");

userSchema.statics = {
    getUserData,
    isFollowing,
    addFollowing,
    removeFollowing,
    findUserByEmail,
    findUserByUserName,
    getUniqueUsername
};

userSchema.plugin(findOrCreate);
userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);

module.exports = { userSchema, User };