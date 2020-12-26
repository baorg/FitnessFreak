const express = require("express");
const router = express.Router();
const {
    searchUserHandler,
    getUserDataHandler,
    getUserFromIdHandler,
    getUserFromUsernameHandler,
    updateProfileHandler
} = require('../Handlers').UsersHandler;
const { isAuthenticated, sendResponse } = require("../Middlewares");


// router.use(isAuthenticated);
router.post("/searchusers", searchUserHandler);
router.get("/get-userdata", isAuthenticated, getUserDataHandler);
router.post("/get-userdata-id", getUserFromIdHandler);

router.post("/get-userdata-username", getUserFromUsernameHandler);
router.post("/update-profile", isAuthenticated, updateProfileHandler, sendResponse);

module.exports = router;