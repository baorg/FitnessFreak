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

    console.log(username + " trying to login.");

    return req.login(user, function(err) {
        if (err) {
            console.error('ERROR: ', err);
            return res.send({ success: false, authenticated: false, error: 'Some internal error.' });
        } else {
            if (req.user) {
                if (req.user.email_verified) {
                    return res.send({ success: true, authenticated: true, user: req.user });
                }else{
                    passport.authenticate("local")(req, res, function() {
                    // console.log('User: ', req.user);
                        res.send({ success: false, authenticated: false, error: 'Email not verified. Check your email for verification code.', email_verified: false });
                    });
                }
            } else {
                console.log('Not valid');
                res.send({ success: false, authenticated: false, error: 'Invalid username or password', email_verified: false });
            }
        }
    });

}