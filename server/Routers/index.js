const express = require("express");
const router = express.Router();
const followingRouter = require('./following');
const questionRouter = require('./question');
const usersRouter = require('./users');
const authRouter = require('./auth');

router.use('/following', followingRouter);
router.use('/Question', questionRouter);
router.use('/Users', usersRouter);
router.use('/auth', authRouter);

module.exports = router