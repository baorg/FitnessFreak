const mongoose = require("mongoose");
const { commentSchema } = require("./Comment")

const answerSchema = new mongoose.Schema({
    upDown: [],
    // {
    //     value: Number,
    //     userId: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'User'
    //     }
    // }
    vote_count: { upvote: { type: Number, default: 0 }, downvote: { type: Number, default: 0 } },
    answer: String,
    comments: [commentSchema],
    quesId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ques' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
const Answer = new mongoose.model("Ans", answerSchema);

module.exports = {
    answerSchema,
    Ans: Answer
}