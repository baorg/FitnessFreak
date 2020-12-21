const { User, Token } = require('../../../Models');
const { validationResult } = require('express-validator');

module.exports = async function resetPassword(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ success: false, errors: errors.array() });
    }
    const { password1, password2, token } = req.body;

    console.log()
}