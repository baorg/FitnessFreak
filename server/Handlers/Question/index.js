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
const { profilePrivileges } = require("./profilePrivileges")
const { getCategory } = require("./category")
const { getNotifications } = require("./getNotifications")
const { postComment } = require("./postComment")
const { getAnswersByQuesId } = require("./getAnswersByQuesId");
const { getCommentsByAnswerId } = require("./getCommentsByAnswerId");
const { getQuestionsCategoryWise } = require("./getQuestionsCategoryWise");
const { getAnswersByUserOnly } = require("./getAnswersByUserOnly");
const { markAnswer, isQuestionAskedByUser } = require("./markAnswer");
const { getAnswersOfUser, getQuestionOfUser, getBookmarksOfUser } = require('./getDataOfUser');
const { deleteQuestion, deleteAnswer, deleteComment } = require('./deleteQuestion')
const { getUnansweredCount } = require('./getUnansweredCount');


module.exports = {
    getUnansweredCount,

    getQuestionsHandler,
    getOneQuestionHandler,

    getQuestionOfUser,
    getAnswersOfUser,

    postAnswerHandler,
    postQuestionHandler,
    addVoteHandler,
    editVoteHandler,

    saveBookMark,
    isBookMarked,
    getBookmarksOfUser,

    getTypeOfQuestionsHandler,
    getFeedQuestion,
    uploadAttachmentsHandler,
    profilePrivileges,
    getCategory,
    getNotifications,
    postComment,
    getAnswersByQuesId,
    getCommentsByAnswerId,
    getQuestionsCategoryWise,
    getAnswersByUserOnly,
    markAnswer,
    isQuestionAskedByUser,
    deleteQuestion,
    deleteAnswer,
    deleteComment
}