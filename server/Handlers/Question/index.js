const { request } = require("express");

const { getOneQuestionHandler, getQuestionsHandler } = require('./getQuestions');
const postAnswerHandler = require('./postAnswer');
const postQuestionHandler = require('./postQuestion');

module.exports = {
    getOneQuestionHandler,
    getQuestionsHandler,
    postAnswerHandler,
    postQuestionHandler
}