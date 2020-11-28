const express = require("express");
const router = express.Router();
const followingRouter = require('./following');
const questionRouter = require('./question');
const usersRouter = require('./users');
const authRouter = require('./auth');
const feedRouter = require('./feed');


router.use('/auth', authRouter);
router.use('/following', followingRouter);
router.use('/feed', feedRouter);
router.use('/Question', questionRouter);
router.use('/Users', usersRouter);
module.exports = router