const express = require("express");
const router = express.Router();
const multiparty = require('connect-multiparty');
const MultipartyMiddleware = multiparty({ uploadDir: './tmpfiles' });
const { isAuthenticated } = require("../Middlewares");
const QuestionHandler = require('../Handlers').QuestionHandler;
const { postQuestionValidator } = require('./../Validators').QuestionValidators

// router.use();
router.get("/getQuestions", isAuthenticated, QuestionHandler.getQuestionsHandler);
router.get("/getQuestions/:id", isAuthenticated, QuestionHandler.getOneQuestionHandler);
router.post("/postQuestion", isAuthenticated, postQuestionValidator, QuestionHandler.postQuestionHandler);
router.post("/postAnswer", isAuthenticated, QuestionHandler.postAnswerHandler);
router.post("/votes/byUser", isAuthenticated, QuestionHandler.addVoteHandler);
router.post("/votes/editVote", isAuthenticated, QuestionHandler.editVoteHandler);
router.post("/saveBookMark", isAuthenticated, QuestionHandler.saveBookMark);
router.post("/isBookMarked", isAuthenticated, QuestionHandler.isBookMarked);
router.get("/get-feed-question", QuestionHandler.getFeedQuestion);
router.post("/upload", isAuthenticated, MultipartyMiddleware, QuestionHandler.uploadAttachmentsHandler);
router.get("/profilePrivileges/:name", QuestionHandler.profilePrivileges)
router.get("/getCategory", QuestionHandler.getCategory)
router.get("/getNotifications", QuestionHandler.getNotifications);
router.post("/postComment",QuestionHandler.postComment);
router.get("/:name", QuestionHandler.getTypeOfQuestionsHandler);


module.exports = router;