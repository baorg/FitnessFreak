const addFollowingHandler = require("./add");
const isFollowingHandler = require("./check");
const removeFollowingHandler = require("./delete");
const getFollowersHandler = require("./getFollowers");
const getFollowingsHandler = require("./getFollowings");

module.exports = {
    addFollowingHandler,
    isFollowingHandler,
    removeFollowingHandler,
    getFollowersHandler,
    getFollowingsHandler,
}