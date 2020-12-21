const mongoose = require("mongoose");
const {
    validateEmail,
    validateUsername,
    validateCategory
} = require("./validators");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        validate: [validateUsername, 'Please fill a valid username']
    },
    first_name: String,
    last_name: String,
    created_at: Date,
    google_id: String,
    google_setup: {
        setup: { type: Boolean, default: false },
        access_token: String,
        refresh_token: String
    },
    facebook_id: String,
    password: String,
    email: {
        type: String,
        trim: true,
        lowercase: true,
        validate: [validateEmail, 'Please fill a valid email address'],
    },
    profile_image: {
        type: String,
        default: null
    },
    question: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ques' }],
    answer: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ans' }],
    bio: {
        type: String,
        default: ""
    },
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ques' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    score: [{
        name: { type: String },
        score: { type: Number, default: 0 },
        _id: false
    }],
    notifications: [],
    feed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ques' }],
    feed_last_updated: { type: Date, default: new Date(0) },
    is_verified: { type: Boolean, default: false },
    chosen_category: {
        type: [{
            type: String,
            validate: [validateCategory, 'Invalid category']
        }],
        default: []
    }
});

module.exports = userSchema;