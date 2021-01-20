const express = require("express");
const router = express.Router();

const AnswerHandler = require('./../Handlers').AnswerHandler;
const isAuthenticated = require('../Middlewares').isAuthenticated;


router.get('/get-answer', AnswerHandler.getAnswerById);
router.post('/get-answer-of-question', AnswerHandler.getAnswersByQuesId);

module.exports = router;