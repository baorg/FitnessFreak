const express = require("express");
const router = express.Router();
const postQuestion = require("./handlers/postQues")

router.use("/postQuestion", postQuestion);
// router.use("/getQuestions", getQuestions);

module.exports = router