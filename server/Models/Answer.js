const mongoose = require("mongoose");
const { commentSchema } = require("./Comment")

const answerSchema = new mongoose.Schema({
    upDown: [],
    vote_count: { 
        upvote: { type: Number, default: 0 }, 
        downvote: { type: Number, default: 0 } 
    },
    answer: String,
    comments: [ commentSchema ],
    quesId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ques' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    posted_at: {type: Date, default: Date.now()},
    marked: { type: Boolean, default: 0 }
});
const Answer = new mongoose.model("Ans", answerSchema);

module.exports = {
    answerSchema,
    Ans: Answer
}