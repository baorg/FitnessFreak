const express = require("express");
const router = express.Router();
const followingRouter = require('./following');
const questionRouter = require('./question');

router.use('/following', followingRouter);
router.use('/Question', questionRouter);

module.exports = router