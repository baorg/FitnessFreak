const { User, Token } = require('../../Models');
const { validationResult } = require('express-validator');
const sendMail = require('../utils/mailer');
const { API_DOMAIN } = require('../../config');

async function updateEmail(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(req.body);
        res.data.success = false;
        res.data.errors = errors.array();
        return next();
    }

    const { email } = req.body;
    let user = req.user;

    try {
        user.email = email;
        user.email_verified = false;
        user = await user.save();
        let token = await Token.create_token(user, 'verify_email');

        // Send mail
        let html = `
            <div>
                <h3>Follow this link to verify your account</h3>
                <a target="_blank" href="${API_DOMAIN}/auth/verify-user-email?token=${token.token}" >Verify account</a>
                <p>Verify   ${API_DOMAIN}/auth/verify-user-email?token=${token.token}</p>
            </div>`;
        let msg = `Verify   ${API_DOMAIN}/auth/verify-user-email?token=${token.token}`;
        await sendMail(user.email, 'Verify account', html, msg);

        res.data.success = true;
        res.data.user = user;
        res.data.sent_email = true;
    } catch (err) {
        console.error('ERROR: ', err);
        res.data.success = false;
    } finally {
        return next();
    }

}

async function updateProfile(req, res, next) {
    try {
        let user = req.user;
        console.log('data:', req.body);
        let {
            first_name = user.first_name,
                last_name = user.last_name,
                bio = user.bio
        } = req.body;

        user.first_name = first_name;
        user.last_name = last_name;
        user.bio = bio;
        await user.save();

        res.data.success = true;
        res.data.updated = true;
        res.data.user = user;

    } catch (err) {
        console.err('ERROR: ', err);
        res.data.success = false;
        res.data.error = 'Some error occured in our end.';
        res.data.updated = false;
    } finally {
        return next();
    }
}



module.exports = {
    updateProfile,
    updateEmail
};