const mongoose = require("mongoose");


const commentSchema = new mongoose.Schema({
    comment: String,
    upDown: [{
        value: Number,
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    }],
    vote_count: { upvote: { type: Number, default: 0 }, downvote: { type: Number, default: 0 } },
    posted_at: {type: Date, default: Date.now()},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    answerId : {type: mongoose.Schema.Types.ObjectId, ref: 'Ans'},
    questionId: {type: mongoose.Schema.Types.ObjectId, ref: 'Ques'},
});
const Comment = new mongoose.model("Comment", commentSchema);

module.exports = { commentSchema, Comment };