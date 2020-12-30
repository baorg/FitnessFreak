const sendMail = require('../../utils/mailer');
const { User, Token } = require('../../../Models');
const { API_DOMAIN } = require('../../../config');


module.exports.requestEmailVerification = async function(user) {
    if (user.email_verified === true) {
        return { success: false, error: 'Email of user already verified.' };
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

    return { success: true, mail_sent: true };
}