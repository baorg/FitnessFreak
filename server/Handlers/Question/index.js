const { request } = require("express");

const { getOneQuestionHandler, getQuestionsHandler } = require('./getQuestions');
const postAnswerHandler = require('./postAnswer');
const postQuestionHandler = require('./postQuestion');
const { addVoteHandler, editVoteHandler } = require("./Voting");

module.exports = {
    getOneQuestionHandler,
    getQuestionsHandler,
    postAnswerHandler,
    postQuestionHandler,
    addVoteHandler,
    editVoteHandler
}