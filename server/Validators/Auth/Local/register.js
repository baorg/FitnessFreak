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
    .isLength({ min: 3 }).withMessage('Username should be of more than 3 characters.').bail()
    .isLength({ max: 30 }).withMessage('Username should be of less than 30 characters.').bail()
    .custom(username => {
        if (/^[A-Za-z]/.test(username))
            return Promise.resolve();
        else
            return Promise.reject('Username should start with an alphabet.');
    }).withMessage('Username should start with an alphabet.').bail()
    .custom(username => {
        if (username.startsWith('.'))
            return Promise.reject('Username should not start with \'.\'');
        else
            return Promise.resolve();
    }).withMessage('Username should not start with \'.\'').bail()
    .custom(username => {
        if (username.endsWith('.'))
            return Promise.reject('Username should not end with \'.\'');
        else
            return Promise.resolve();
    }).withMessage('Username should not end with \'.\'').bail()
    .custom(username => {
        if (/\.\./.test(username))
            return Promise.reject('Username should not have consecutive \'.\'');
        else
            return Promise.resolve();
    }).withMessage('Username should not have consecutive \'.\'').bail()
    .custom(username => {
        if (/[a-zA-Z]/.test(username))
            return Promise.resolve();
        else
            return Promise.reject('Username should have at least 1 alphabet.');
    }).withMessage('Username should have at least 1 alphabet.').bail()
    .matches(/^[a-zA-Z][._a-zA-Z0-9]+[_a-zA-Z0-9]$/).withMessage('username should be in lowercase with digits and _ allowed (min. length=3).').bail()
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
    .isLength({ min: 6 }).withMessage('must be at least 6 chars long').bail(),

    body('password2').custom((password2, { req }) => {
        let password1 = req.body.password1;
        if (password1 !== password2)
            return Promise.reject('passwords didn\'t matched.');
        else
            return Promise.resolve();
    }),
]