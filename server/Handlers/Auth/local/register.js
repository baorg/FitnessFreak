const passport = require('passport');
const { validationResult } = require('express-validator');
const { User } = require('../../../Models');
const createVerification = require('../Verification/create_verification');

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
        function(err, user) {
            if (err) {
                // console.error("Error during authentication: ", err);
                // res.data.success = false;
                // res.data.errors = [];
                // res.data.registered = false;
                // return next();
                return res.send({ success: false, errors: [], registered: false });
            } else {
                createVerification(user)
                    .then(function(data) {
                        return res.send(data);
                    })
                    .catch(function(err) {
                        console.error('ERROR: ', err);
                        return res.send({ success: false, registered: false });
                    });
            }
        });

}