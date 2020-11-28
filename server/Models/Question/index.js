const mongoose = require('mongoose');
const questionSchema = require('./schema');

const { getQuestionsInBetween, getQuestionsOfUser, getTopQuestions } = require('./statics');

questionSchema.statics = {
    getQuestionsInBetween,
    getQuestionsOfUser,
    getTopQuestions
};

const Question = new mongoose.model("Ques", questionSchema);

module.exports = {
    questionSchema,
    Ques: Question
}