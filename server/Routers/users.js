const express = require("express");
const router = express.Router();
const {
    searchUserHandler,
    getUserDataHandler,
    getUserFromIdHandler,
    getUserFromUsernameHandler,
    updateHandlers,
    verifyHandlers, 
    getSuggestions
} = require('../Handlers').UsersHandler;
const { isAuthenticated, sendResponse } = require("../Middlewares");
const UserValidators = require('../Validators').UserProfileValidators;



// router.use(isAuthenticated);
router.post("/searchusers", searchUserHandler);
router.get("/get-userdata", isAuthenticated, getUserDataHandler);
router.post("/get-userdata-id", getUserFromIdHandler);

router.post("/get-userdata-username", getUserFromUsernameHandler);
router.post("/update-profile", isAuthenticated, updateHandlers.updateProfile);

router.post("/request-update-email", isAuthenticated, UserValidators.updateEmail, updateHandlers.requestUpdateEmail);
router.post("/update-email", updateHandlers.updateEmail);

router.post('/update-image', isAuthenticated, updateHandlers.updateImage);
router.get("/request-verify-email", verifyHandlers.requestVerifyEmail);

router.get("/get-suggestions", getSuggestions);


module.exports = router;