const passport = require('passport');
const { validationResult } = require('express-validator');
const { User } = require('../../../Models');


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

    // console.log("Data: ",
    //     username,
    //     firstname,
    //     lastname,
    //     email,
    //     password1,
    //     password2);

    return User.register({ username: username, email: email, first_name: firstname, last_name: lastname },
        password1,
        function(err, user) {
            if (err) {
                console.error("Error during authentication: ", err);
                return res.send({ success: false, errors: [] });
            } else {
                return res.send({ success: true, registered: true });
            }
        });

    // res.send({ succes: true, msg: 'git the data' });
}