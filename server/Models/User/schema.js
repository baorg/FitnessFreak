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
    created_at: {
        type: Date,
        default: Date.now
    },
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
    email_verified: { type: Boolean, default: false },
    profile_image: {
        type: String,
        default: null
    },
    banner_image: {
        type: String,
        default: null
    },
    question: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ques', uniqueItems: true }],
    answer: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ans', uniqueItems: true }],
    bio: {
        type: String,
        default: ""
    },
    bookmarks: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ques', uniqueItems: true }],
        default: []
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', uniqueItems: true }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', uniqueItems: true }],
    score: {
        type: [{
            name: { type: String },
            score: { type: Number, default: 0 },
            _id: false
        }],
        default: [{ name: "totalScore", score: 0 }, ]
    },
    feed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ques' }],
    feed_last_updated: { type: Date, default: new Date(0) },
    is_verified: { type: Boolean, default: false },
    chosen_category: {
        type: [{
            type: String,
            validate: [validateCategory, 'Invalid category']
        }],
        default: []
    },
    notifications: [{
        _id: { type: mongoose.Schema.Types.ObjectId },
        notifier: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        entity: { type: Number },
        entity_data: { type: mongoose.Schema.Types.ObjectId },
        status: { type: Number },
        created_timestamp: { type: Date },
        seen_timestamp: { type: Date }
    }],
});

module.exports = userSchema;