const express = require("express");
const router = express.Router();


const {
    postAnswerHandler,
    postQuestionHandler,
    getOneQuestionHandler,
    getQuestionsHandler
} = require('../Handlers').QuestionHandler;


const { isAuthenticated } = require("../Middlewares");
router.use(isAuthenticated);
router.get("/getQuestions", getQuestionsHandler);
router.get("/:id", getOneQuestionHandler);
router.post("/postQuestion", postQuestionHandler);
router.post("/postAnswer", postAnswerHandler);

module.exports = router;