const mongoose = require("mongoose");


const commentSchema = new mongoose.Schema({
    comment: String,
    upDown: [],
    // {
    //     value: Number,
    //     userId: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'User'
    //     }
    // }
    vote_count: { upvote: { type: Number, default: 0 }, downvote: { type: Number, default: 0 } },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    asnwerId : {type: mongoose.Schema.Types.ObjectId, ref: 'Ans'}
});
const Comment = new mongoose.model("Comment", commentSchema);

module.exports = { commentSchema, Comment };