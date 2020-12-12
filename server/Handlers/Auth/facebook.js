function facebookCallbackHandler(req, res, next) {
    console.log("Facebook callback handler: ", req.query);
    return next();
}

module.exports = facebookCallbackHandler;