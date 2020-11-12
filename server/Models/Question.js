const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    upDown: [],
    question: String,
    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ans' }],
    categoryName: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    tags: [String]
});
const Question = new mongoose.model("Ques", questionSchema);

module.exports = {
    questionSchema,
    Ques: Question
}