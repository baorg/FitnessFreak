const express = require("express");
const router = express.Router();
const followingRouter = require('./following');
const questionRouter = require('./question');
const usersRouter = require('./users');
const authRouter = require('./auth');
const feedRouter = require('./feed');
const rankRouter = require("./rank")
const uploadRouter = require("./upload");

const { initRequest } = require('../Middlewares');

router.use(initRequest);

router.use('/auth', authRouter);
router.use('/following', followingRouter);
router.use('/feed', feedRouter);
router.use('/Question', questionRouter);
router.use('/Users', usersRouter);
router.use("/Rank", rankRouter);
router.use('/upload', uploadRouter);

module.exports = router