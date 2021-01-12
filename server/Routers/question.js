const express = require("express");
const router = express.Router();
const multiparty = require('connect-multiparty');
const MultipartyMiddleware = multiparty({ uploadDir: './tmpfiles' });
const { isAuthenticated } = require("../Middlewares");
const QuestionHandler = require('../Handlers').QuestionHandler;
const { postQuestionValidator } = require('./../Validators').QuestionValidators


// router.use();
router.get("/get-questions", QuestionHandler.getQuestionsHandler);
router.get("/get-question/:ques_id", QuestionHandler.getOneQuestionHandler);

router.get("/get-questions-of-user", QuestionHandler.getQuestionOfUser);
router.post("/post-question", isAuthenticated, postQuestionValidator, QuestionHandler.postQuestionHandler);


router.get("/get-answers-of-question", QuestionHandler.getAnswersByQuesId);
router.get("/get-answers-of-user", QuestionHandler.getAnswersOfUser);
router.post("/post-answer", isAuthenticated, QuestionHandler.postAnswerHandler);


router.post("/post-comment", isAuthenticated, QuestionHandler.postComment);
router.get("/get-comments-of-answer", QuestionHandler.getCommentsByAnswerId);

router.post("/save-bookmark", isAuthenticated, QuestionHandler.saveBookMark);
router.get("/is-bookmarked", isAuthenticated, QuestionHandler.isBookMarked);



router.post("/votes/byUser", isAuthenticated, QuestionHandler.addVoteHandler);
router.post("/votes/editVote", isAuthenticated, QuestionHandler.editVoteHandler);

router.get("/get-feed-question", QuestionHandler.getFeedQuestion);
router.post("/upload", isAuthenticated, MultipartyMiddleware, QuestionHandler.uploadAttachmentsHandler);
router.post("/profilePrivileges/:name", QuestionHandler.profilePrivileges)
router.get("/getCategory", QuestionHandler.getCategory)
router.get("/getNotifications", isAuthenticated, QuestionHandler.getNotifications);


router.get("/getQuestionsCategoryWise/:name", QuestionHandler.getQuestionsCategoryWise);
router.post("/getAnswersByUserOnly/:quesId", QuestionHandler.getAnswersByUserOnly);

router.post('/deleteQuestion', QuestionHandler.deleteQuestion)
router.post('/deleteAnswer', QuestionHandler.deleteAnswer)

router.post("/markAnswer", QuestionHandler.markAnswer)
router.post("/isQuestionAskedByUser", QuestionHandler.isQuestionAskedByUser)
router.get("/get-type/:name", QuestionHandler.getTypeOfQuestionsHandler);



module.exports = router;