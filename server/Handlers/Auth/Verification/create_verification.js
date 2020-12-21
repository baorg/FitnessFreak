const sendMail = require('../../utils/mailer');
const { User, Token } = require('../../../Models');
const { API_DOMAIN } = require('../../../config');


module.exports = async function createVerification(user) {
    if (user.is_verified === true) {
        return { success: false, error: 'user already verified' };
    }
    let token = await Token.create_token(user, 'verify');

    // Send mail
    let html = `
        <div>
            <h3>Follow this link to verify your account</h3>
            <a target="_blank" href="${API_DOMAIN}/auth/verify-user?token=${token.token}" >Verify account</a>
            <p>Verify   ${API_DOMAIN}/auth/verify-user?token=${token.token}</p>
        </div>`;
    let msg = `Verify   ${API_DOMAIN}/auth/verify-user?token=${token.token}`;
    await sendMail(user.email, 'Verify account', html, msg);

    return { success: true, mail_sent: true };
}