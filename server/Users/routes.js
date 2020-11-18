const express = require("express");
const router = express.Router();

const searchusers = require("./handlers/searchusers")
const { isAuthenticated } = require("../Middlewares");

router.use(isAuthenticated);
router.use("/searchusers", searchusers);


module.exports = { userRouter: router }