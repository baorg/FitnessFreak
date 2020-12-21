const { check, body, validationResult } = require('express-validator');
const { User } = require('../Models');

module.exports = [
    body(['password1', 'password2']).exists().withMessage("Password should be present.").bail()
    .isLength({ min: 6 }).withMessage('must be at least 6 chars long').bail(),

    body('password2').custom((password2, { req }) => {
        let password1 = req.body.password1;
        if (password1 !== password2)
            return Promise.reject('passwords didn\'t matched.');
        else
            return Promise.resolve();
    }),

    body('token').exists().withMessage('Invalid token.').bail()
    .matches(/^[A-Za-z0-9]{40}$/).withMessage('Invalid token').bail()
]