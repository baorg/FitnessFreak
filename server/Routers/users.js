const express = require("express");
const router = express.Router();
const {
    searchUserHandler,
    getUserDataHandler,
    getUserFromIdHandler,
    getUserFromUsernameHandler,
    updateProfileHandler
} = require('../Handlers').UsersHandler;
const { isAuthenticated, response } = require("../Middlewares");


// router.use(isAuthenticated);
router.post("/searchusers", searchUserHandler);
router.get("/get-userdata", getUserDataHandler);
router.post("/get-userdata-id", getUserFromIdHandler);
router.post("/get-userdata-username", getUserFromUsernameHandler);
router.post("/update-profile", isAuthenticated, updateProfileHandler, response);

module.exports = router;