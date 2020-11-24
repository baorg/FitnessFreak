const { check, body, validationResult } = require('express-validator');
const { User } = require('../../../Models');

module.exports = [
    body('username').exists().withMessage('Username should be present'),
    body('password').exists().withMessage("Password should be present.")
]