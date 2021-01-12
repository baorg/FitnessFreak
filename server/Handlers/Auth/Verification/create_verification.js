const sendMail = require('../../utils/mailer');
const { User, Token } = require('../../../Models');
const { API_DOMAIN } = require('../../../config');


module.exports.requestEmailVerification = async function(user) {
    if (user.email_verified === true) {
        return { success: false, error: 'Email of user already verified.' };
    }
    let token = await Token.create_token(user, 'verify_email');

    // Send mail
    let response = {
        body: {
            name: user.username,
            intro: 'Welcome to Fitness Freak! We\'re very excited to have you on board.',
            action: {
                instructions: 'To get started with FitnessFreak, please click here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Confirm your email',
                    link: `${API_DOMAIN}/auth/verify-user-email?token=${token.token}`
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    };
    let success = await sendMail(user.email, 'Verify Email', response);

    return success;

    // return { success: true, mail_sent: true };
}