const mongoose = require('mongoose');
const questionSchema = require('./schema');
const questionMiddlewares = require('./middleware');

const { getQuestionsInBetween, getQuestionsOfUser, getTopQuestions } = require('./statics');

questionSchema.statics = {
    getQuestionsInBetween,
    getQuestionsOfUser,
    getTopQuestions
};

questionSchema.post('updateOne', questionMiddlewares.updateQuestionComments);


const Question = new mongoose.model("Ques", questionSchema);

module.exports = {
    questionSchema,
    Ques: Question
}