const express = require("express");
const router = express.Router();

const AnswerHandler = require('./../Handlers').AnswerHandler;
const isAuthenticated = require('../Middlewares').isAuthenticated;


router.get('/get-answer', AnswerHandler.getAnswerById);
router.get('/get-answers-of-question', AnswerHandler.getAnswersByQuesId);

// Comments 
router.get('/get-comments', AnswerHandler.getComments);
router.post('/post-comment', isAuthenticated, AnswerHandler.postComment);
router.delete('/delete-comment', isAuthenticated, AnswerHandler.deleteComment);
router.get('/upvote-comment', isAuthenticated, AnswerHandler.upvoteComment);
router.get('/downvote-comment', isAuthenticated, AnswerHandler.downvoteComment);
router.get('/unvote-comment', isAuthenticated, AnswerHandler.unvoteComment);

module.exports = router;