const passport = require('passport');
const { validationResult } = require('express-validator');
const { User, Token } = require('../../../Models');
const { requestEmailVerification } = require('../Verification/create_verification');

module.exports = function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ success: false, errors: errors.array() });
    }

    const {
        username,
        firstname,
        lastname,
        email,
        password1,
        password2
    } = req.body;


    return User.register({ username: username, email: email, first_name: firstname, last_name: lastname },
        password1,
        async function(err, user) {
            if (err) {
                console.log('ERROR:', err);
                res.data.success = false;
                res.data.registered = false;
                res.data.error = "Some internal error.";
                res.data.errors = [];
                return next();
            } else {
                try {
                    res.data.success = true;

                    res.data.registered = true;
                    res.data.errors = []

                    let mail_sent = requestEmailVerification(user);
                    res.data.email_verification_mail_sent = mail_sent;
                } catch (err) {
                    console.error('ERROR: ', err);
                    res.data.error = "Some internal error.";
                    res.data.mail_sent = false;
                } finally {
                    return next();
                }
            }
        });

}