const express = require("express");
const CLIENT_URL = "http://localhost:3000";

function isLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        console.log("authentication error = ")
        return res.send({ isAuthenticated: false, error: 'Not authenticated' });
    } else
        next();
}

module.exports = { isLoggedIn };