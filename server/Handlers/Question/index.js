const { request } = require("express");

const {
    getOneQuestionHandler,
    getQuestionsHandler,
    getFeedQuestion
} = require('./getQuestions');

const postAnswerHandler = require('./postAnswer');
const postQuestionHandler = require('./postQuestion');
const { addVoteHandler, editVoteHandler } = require("./Voting");
const { saveBookMark, isBookMarked } = require("./bookmark");
const { getTypeOfQuestionsHandler } = require("./TypeOfQues");
const uploadAttachmentsHandler = require("./uploadAttachments");
const {profilePrivileges} = require("./profilePrivileges")
const {getCategory} = require("./category")
const {getNotifications} = require("./getNotifications")
const {postComment} = require("./postComment")

module.exports = {
    getOneQuestionHandler,
    getQuestionsHandler,
    postAnswerHandler,
    postQuestionHandler,
    addVoteHandler,
    editVoteHandler,
    saveBookMark,
    isBookMarked,
    getTypeOfQuestionsHandler,
    getFeedQuestion,
    uploadAttachmentsHandler,
    profilePrivileges,
    getCategory,
    getNotifications,
    postComment
}