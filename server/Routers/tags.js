const express = require("express");
const router = express.Router();
const TagsHandler = require('../Handlers').TagHandler;
const { isAuthenticated } = require("../Middlewares");

router.get("/get-tags", TagsHandler.getTags)

module.exports = router;