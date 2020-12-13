const { check, body, validationResult } = require('express-validator');
const { User } = require('./../../Models');
const { category } = require('./../../config');

// module.exports = [
//     body('first-name')
//         .matches(/^[_A-Za-z]+$/).withMessage('Only alphabets are allowed in name.')
//         .if().exists
// ]