const express = require("express");
const router = express.Router();
const {
    logoutHandler,
    resetPasswordHandler,
} = require('../../Handlers/Auth');

const { resetPasswordValidator } = require('../../Validators');

const googleRouter = require('./google');
const localRouter = require('./local');
const facebookRouter = require('./facebook');
const verifyToken = require('../../Handlers/Auth/Verification/verify');


router.get('/logout', logoutHandler);
router.use('/google', googleRouter);
router.use('/facebook', facebookRouter);
router.use('/local', localRouter);

router.get('/verify-user-email', verifyToken.verifyEmailHandler);
router.post('/reset-password', resetPasswordValidator, resetPasswordHandler);


module.exports = router;