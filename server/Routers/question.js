const express = require("express");
const router = express.Router();


const {
    postAnswerHandler,
    postQuestionHandler,
    getOneQuestionHandler,
    getQuestionsHandler,
    addVoteHandler,
    editVoteHandler
} = require('../Handlers').QuestionHandler;


const { isAuthenticated } = require("../Middlewares");
router.use(isAuthenticated);
router.get("/getQuestions", getQuestionsHandler);
router.get("/:id", getOneQuestionHandler);
router.post("/postQuestion", postQuestionHandler);
router.post("/postAnswer", postAnswerHandler);
router.post("/votes/byUser", addVoteHandler);
router.post("/votes/editVot", editVoteHandler);
module.exports = router;