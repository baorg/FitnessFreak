const express = require("express");
const router = express.Router();
const {
    logoutHandler,
    resetPassword,
    requestRestPassword
} = require('../../Handlers/Auth');

const { resetPasswordValidator } = require('../../Validators');
const { isAuthenticated } = require('../../Middlewares');
const googleRouter = require('./google');
const localRouter = require('./local');
const facebookRouter = require('./facebook');
const verifyToken = require('../../Handlers/Auth/Verification/verify');


router.get('/logout', isAuthenticated, logoutHandler);
router.use('/google', googleRouter);
router.use('/facebook', facebookRouter);
router.use('/local', localRouter);

router.get('/verify-user-email', verifyToken.verifyEmailHandler);
router.get('/request-reset-password', requestRestPassword);
router.post('/reset-password', resetPasswordValidator, resetPassword);

module.exports = router;