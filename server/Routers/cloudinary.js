const express = require("express");
const router = express.Router();
const { CloudinaryHandler } = require("../Handlers");
const { initRequest, sendResponse } = require('../Middlewares');

router.use(initRequest);

router.get('/generate_signature', CloudinaryHandler.signPayload);

router.use(sendResponse);


module.exports = router