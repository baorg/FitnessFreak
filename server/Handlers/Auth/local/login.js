const passport = require('passport');
const { validationResult } = require('express-validator');
const { User } = require('../../../Models');


module.exports = function(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.send({ success: false, errors: errors.array() });
    }

    const {
        username,
        password,
    } = req.body;
    const user = new User({
        username: username,
        password: password
    });

    return req.login(user, function(err) {
        if (err) {
            console.error('ERROR: ', err);
            return res.send({ success: false });
        } else {
            passport.authenticate("local")(req, res, function() {
                // console.log('User loged in.');
                return res.send({ success: true, authenticated: true, user: req.user });
            });
        }
    });

}