const express = require("express");
const router = express.Router();
const RankHandler = require('../Handlers').RankHandler;
const { isAuthenticated } = require("../Middlewares");

router.get("/ByCategory/:name",RankHandler.getRankByCategory)

module.exports = router;