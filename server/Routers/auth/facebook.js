const express = require("express");
const router = express.Router();
const passport = require("passport");
const { facebookCallbackHandlerfunction } = require("../../Handlers/Auth");
const { CLIENT_DOMAIN } = require('../../config');

const CLIENT_HOME_PAGE_URL = CLIENT_DOMAIN;
const CLIENT_LOGIN_PAGE_URL = `${CLIENT_HOME_PAGE_URL}/auth`;

router.get("", passport.authenticate('facebook', {
    failureRedirect: CLIENT_LOGIN_PAGE_URL
}));

router.get('/callback', facebookCallbackHandlerfunction,
    passport.authenticate('facebook', {
        successRedirect: CLIENT_HOME_PAGE_URL,
        failureRedirect: CLIENT_LOGIN_PAGE_URL
    }),
    function(req, res, next) {
        // console.log("Request user: ", req.user);
        // if (req.user.userName === undefined)
        //     res.redirect(CLIENT_USERNAME_SET_PAGE);
        // else
        //     res.redirect(CLIENT_HOME_PAGE_URL);
        res.redirect(CLIENT_HOME_PAGE_URL);
    });

module.exports = router;