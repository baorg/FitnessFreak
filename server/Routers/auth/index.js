const express = require("express");
const router = express.Router();
const { logoutHandler } = require('../../Handlers/Auth');
const googleRouter = require('./google');
const localRouter = require('./local');
const facebookRouter = require('./facebook');

router.get('/logout', logoutHandler);
router.use('/google', googleRouter);
router.use('/facebook', facebookRouter);
router.use('/local', localRouter);

module.exports = router;