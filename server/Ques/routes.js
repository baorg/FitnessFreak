const express = require("express");
const router = express.Router();

const postQuestion = require("./handlers/postQues")
const postAnswer = require("./handlers/postAnswer")
const getQuestions = require("./handlers/getQuestions")
const { isAuthenticated } = require("../Middlewares");

router.use(isAuthenticated);
router.use("/postQuestion", postQuestion);
router.use("/getQuestions", getQuestions);
router.use("/postAnswer", postAnswer);

module.exports = { questionRouter: router }