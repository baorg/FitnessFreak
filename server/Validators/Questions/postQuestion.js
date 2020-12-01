const { check, body, validationResult } = require('express-validator');
const { User, Ques } = require('./../../Models');
const { category } = require('./../../config');

module.exports = [
    body('category')
    .exists().withMessage('Category should be present')
    .custom(cat => {
        if (category.some(val => val == cat)) {
            return Promise.resolve();
        } else {
            return Promise.reject('Invalid category.');
        }
    }),
    body('title')
    .exists().withMessage('Title should be present.')
    .isLength({ min: 1, max: 50 }).withMessage('Allowed length exceeds.'),
    // body('question'),
]