const express = require("express");
const router = express.Router();
const postQuestion = require("./handlers/postQues")
const getQuestions = require("./handlers/getQuestions")
const isLoggedIn = require("../middleware").isLoggedIn;


router.use(isLoggedIn)
router.use("/postQuestion", postQuestion);
router.use("/getQuestions", getQuestions);

module.exports = router