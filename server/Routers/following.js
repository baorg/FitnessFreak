const express = require("express");
const router = express.Router();
const {
    addFollowingHandler,
    isFollowingHandler,
    removeFollowingHandler,
    getFollowersHandler,
    getFollowingsHandler,
    getFollowCount
} = require('../Handlers').FollowingHandler;
const { isAuthenticated } = require("../Middlewares");


router.get('/check-following', isAuthenticated, isFollowingHandler);
router.post('/add-following', isAuthenticated, addFollowingHandler);
router.post('/remove-following', isAuthenticated, removeFollowingHandler);
router.get('/get-followers-list/:user', getFollowersHandler);
router.get('/get-following-list/:user', getFollowingsHandler);
router.get('/count/:userId', getFollowCount);

module.exports = router;