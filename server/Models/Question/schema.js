const mongoose = require('mongoose');
const { commentSchema } = require('../Comment');


module.exports = new mongoose.Schema({
    title: String,
    question: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    created_at: { type: Date, default: () => new Date(0) },
    tags: [String],
    categoryName: [String],
    attachments: [{ url: String, type_: String }],
    upDown: [],
    vote_count: {
        upvote: { type: Number, default: 0 },
        downvote: { type: Number, default: 0 }
    },
    answers: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ans', uniqueItems: true }],
        default: []
    },
    comments: {
        type: [commentSchema],
        default: []
    },
    answers_count: { type: Number, default: 0 },
    comments_count: { type: Number, default: 0 },
    satisfied: { type: Boolean, default: 0 }
});