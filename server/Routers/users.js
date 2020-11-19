const express = require("express");
const router = express.Router();
const { searchUserHandler, getUserDataHandler, getUserFromIdHandler } = require('../Handlers').UsersHandler;
const { isAuthenticated } = require("../Middlewares");

router.use(isAuthenticated);
router.get("/searchusers", searchUserHandler);
router.get("/get-userdata", getUserDataHandler);
router.post("/get-userdata-id", getUserFromIdHandler);

module.exports = router;