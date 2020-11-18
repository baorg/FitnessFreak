const express = require("express");
const router = express.Router();

const { searchUserHandler } = require('../Handlers/Users');
const { isAuthenticated } = require("../Middlewares");

router.use(isAuthenticated);
router.use("/searchusers", searchUserHandler);


module.exports = router;