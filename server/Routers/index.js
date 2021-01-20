const express = require("express");
const router = express.Router();
const answersRouter = require('./answer');
const authRouter = require('./auth');
const cloudinaryRouter = require('./cloudinary');
const feedRouter = require('./feed');
const followingRouter = require('./following');
const notificationsRouter = require('./notifications');
const questionRouter = require('./question');
const rankRouter = require("./rank")
const uploadRouter = require("./upload");
const usersRouter = require('./users');

const { initRequest, sendResponse } = require('../Middlewares');

router.use(initRequest);

router.use('/answer', answersRouter);
router.use('/auth', authRouter, sendResponse);
router.use('/feed', feedRouter);
router.use('/following', followingRouter);
router.use('/question', questionRouter, sendResponse);
router.use('/rank', rankRouter);
router.use('/upload', uploadRouter);
router.use('/users', usersRouter);
router.use('/cloudinary', cloudinaryRouter);
router.use('/notifications', notificationsRouter);


router.use(sendResponse);


module.exports = router