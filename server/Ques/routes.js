const express = require("express");
const router = express.Router();
const postQuestion = require("./handlers/postQues")

router.post("/postQuestion", postQuestion);

module.exports = router