const FeedHandler = require('./../Handlers').FeedHandler;
const express = require("express");
const router = express.Router();
const { response } = require('../Middlewares');

const isAuthenticated = require('../Middlewares').isAuthenticated;

router.get('/get-feed', FeedHandler.getFeed);
router.post('/refresh-feed', isAuthenticated, FeedHandler.refreshFeed);
router.use(response);

module.exports = router;