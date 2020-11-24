const { LocalAuthHandler } = require('../../Handlers/Auth');
const { LocalAuthValidator } = require('../../Validators/Auth');
const express = require("express");
const router = express.Router();

router.post('/register', LocalAuthValidator.registerValidator, LocalAuthHandler.registerHandler);
router.post('/login', LocalAuthValidator.loginValidator, LocalAuthHandler.loginHandler);

module.exports = router;