const express = require("express");
const router = express.Router();
const {
    searchUserHandler,
    getUserDataHandler,
    getUserFromIdHandler,
    getUserFromUsernameHandler,
    updateHandlers,
    verifyHandlers
} = require('../Handlers').UsersHandler;
const { isAuthenticated, sendResponse } = require("../Middlewares");
const UserValidators = require('../Validators').UserProfileValidators;



// router.use(isAuthenticated);
router.post("/searchusers", searchUserHandler);
router.get("/get-userdata", isAuthenticated, getUserDataHandler);
router.post("/get-userdata-id", getUserFromIdHandler);

router.post("/get-userdata-username", getUserFromUsernameHandler);
router.post("/update-profile", isAuthenticated, updateHandlers.updateProfile);
router.post("/update-email", isAuthenticated, UserValidators.updateEmail, updateHandlers.updateEmail);
router.get("/request-verify-email", verifyHandlers.requestVerifyEmail);

module.exports = router;