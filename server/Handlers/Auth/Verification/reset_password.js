const { User, Token } = require('../../../Models');
const { validationResult } = require('express-validator');

module.exports = async function resetPassword(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.data.success = false;
        res.data.errors = errors.array();
        return next();
    }
    const { password1, password2, token } = req.body;

    console.log()
}