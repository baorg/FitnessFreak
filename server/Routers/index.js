const express = require("express");
const router = express.Router();
const followingRouter = require('./following');
const questionRouter = require('./question');
const usersRouter = require('./users');
const authRouter = require('./auth');
const feedRouter = require('./feed');
const rankRouter = require("./rank")
const uploadRouter = require("./upload");
const cloudinaryRouter = require('./cloudinary');
const notificationsRouter = require('./notifications');


const { initRequest, sendResponse } = require('../Middlewares');

router.use(initRequest);

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