const { User, Token } = require("../../Models");
const { API_DOMAIN } = require("../../config");
const sendMail = require('../utils/mailer');


module.exports.requestVerifyEmail = async function(req, res, next) {
    try {
        let user = req.user;
        if (user.email_verified === true) {
            res.data.success = false;
            res.data.error = 'Email of user already verified.'
            return next();
        }

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
        res.data.mail_sent = true;
    } catch (err) {
        console.error('ERROR: ', err);
        res.data.success = false;
        res.data.error = 'Some internal error.';
    } finally {
        return next();
    }
}