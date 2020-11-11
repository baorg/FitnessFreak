const express = require("express");
const CLIENT_URL = "http://localhost:3000";

function isLoggedIn(req, res, next){

    if(!req.isAuthenticated()){
        console.log("authentication error = ")
        return res.redirect(CLIENT_URL);
    }
    else
    next();
}

module.exports = {isLoggedIn};