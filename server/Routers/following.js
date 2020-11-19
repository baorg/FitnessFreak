const express = require("express");
const router = express.Router();
const {
    addFollowingHandler,
    isFollowingHandler,
    removeFollowingHandler,
    getFollowersHandler,
    getFollowingsHandler,
} = require('../Handlers').FollowingHandler;
const { isAuthenticated } = require("../Middlewares");

function finalHandler(req, res) {
    return res.send(res.data);
}


router.use(isAuthenticated);

router.get('/check-following', isFollowingHandler, finalHandler);
router.post('/add-following', addFollowingHandler, finalHandler);
router.post('/remove-following', removeFollowingHandler, finalHandler);
router.get('/get-followers-list/:user', getFollowersHandler, finalHandler);
router.get('/get-following-list/:user', getFollowingsHandler, finalHandler);

module.exports = router;