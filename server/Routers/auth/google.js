const express = require("express");
const router = express.Router();
const passport = require("passport");
const { googleCallbackHandlerfunction, logoutHandler } = require("../../Handlers/Auth");

const CLIENT_LOGIN_PAGE_URL = "http://localhost:3000/auth";
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";

router.get("", passport.authenticate('google', {
    scope: ["profile"],
    failureRedirect: CLIENT_LOGIN_PAGE_URL
}));

router.get('/callback', googleCallbackHandlerfunction,
    passport.authenticate('google', {
        successRedirect: CLIENT_HOME_PAGE_URL,
        failureRedirect: CLIENT_LOGIN_PAGE_URL
    }),
    function(req, res, next) {
        console.log("Request user: ", req.user);
        if (req.user.userName === undefined)
            res.redirect(CLIENT_USERNAME_SET_PAGE);
        else
            res.redirect(CLIENT_HOME_PAGE_URL);
    });

module.exports = router;