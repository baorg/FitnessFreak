function googleCallbackHandlerfunction(req, res, next) {
    console.log("Google callback handler: ", req.params, req.query, req.body);
    return next();
}

module.exports = googleCallbackHandlerfunction;