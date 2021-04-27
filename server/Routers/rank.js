const express = require("express");
const router = express.Router();
const RankHandler = require('../Handlers').RankHandler;
const { isAuthenticated } = require("../Middlewares");

router.post("/ByCategory", RankHandler.getRankByCategory)
router.get("/user", RankHandler.getUserRank);
module.exports = router;