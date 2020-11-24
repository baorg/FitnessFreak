const passport = require("passport");
const express = require("express");
const { User } = require("../../Models");

const router = express.Router();

const CLIENT_HOME_PAGE_URL = "http://localhost:3000/feed"
const CLIENT_LOGIN_PAGE_URL = "http://localhost:3000"
const CLIENT_USERNAME_SET_PAGE = "http://localhost:3000/first-time-setup";



function googleCallbackHandlerfunction(req, res, next) {
    console.log("Google callback handler: ", req.params, req.query, req.body);
    return next();
}

module.exports = { googleCallbackHandlerfunction };