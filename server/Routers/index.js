const express = require("express");
const router = express.Router();
const followingRouter = require('./following');
const questionRouter = require('./question');
const usersRouter = require('./users');

router.use('/following', followingRouter);
router.use('/Question', questionRouter);
router.use('/Users', usersRouter);


module.exports = router