const { check, body, validationResult } = require('express-validator');
const { User } = require('./../../Models');
const { category } = require('./../../config');

// module.exports = [
//     body('first-name')
//         .matches(/^[_A-Za-z]+$/).withMessage('Only alphabets are allowed in name.')
//         .if().exists
// ]

module.exports.updateEmail = [
    body('email')
    .exists().withMessage('Email should exist.').bail()
    .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).withMessage('Invalid email.').bail()
    .custom(email => {
        // console.log('Running custom validator....');
        return User.findUserByEmail(email).then(
            user => {
                // console.log('User: ', user);
                if (user != null) {
                    // console.log('User exists');
                    return Promise.reject('Email taken.');
                } else {
                    // console.log("Username ", username, ' is free.');
                    return Promise.resolve();
                }
            }
        );
    }).withMessage('Email taken'),
]

// Regular Expression from  https://emailregex.com/