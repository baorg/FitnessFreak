const { check, body, validationResult } = require('express-validator');
const { User } = require('../../../Models');

module.exports = [
    body('email').exists().withMessage('Email should be present.').bail()
    .isEmail().withMessage('Invalid Email.').bail()
    .custom(email => {
        return User.findUserByEmail(email).then(
            user => {
                if (user)
                    return Promise.reject('E-mail already exists.');
                return Promise.resolve();
            });
    }),

    body('username').exists().withMessage('Username should be present').bail()
    .matches(/^[_a-z0-9]+$/).withMessage('username should be in lowercase with digits and _ allowed.').bail()
    .custom(username => {
        // console.log('Running custom validator....');
        return User.findUserByUserName(username).then(
            user => {
                console.log('User: ', user);
                if (user != null) {
                    // console.log('User exists');
                    return Promise.reject('Username taken.');
                } else {
                    console.log("Username ", username, ' is free.');
                    return Promise.resolve();
                }
            }
        );
    }).withMessage("Username taken"),

    body(['password1', 'password2']).exists().withMessage("Password should be present.").bail()
    .isLength({ min: 5 }).withMessage('must be at least 5 chars long').bail(),

    body('password2').custom((password2, { req }) => {
        let password1 = req.body.password1;
        console.log(password1 == password2);
        if (password1 !== password2)
            return Promise.reject('passwords didn\'t matched.');
        else
            return Promise.resolve();
    }),
]