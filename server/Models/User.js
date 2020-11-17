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
    followers: [String],
    following: [String],
    score: { totalScore: Number },
    notifications: []
});

userSchema.plugin(findOrCreate);
const User = new mongoose.model("User", userSchema);

module.exports = { userSchema, User };