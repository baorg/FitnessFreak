const { User, Token } = require("../../Models");
const { API_DOMAIN } = require("../../config");
const sendMail = require('../utils/mailer');


module.exports.requestVerifyEmail = async function(req, res, next) {
    try {
        let { username } = req.query;
        console.log('Username:', username);


        let user = await User.findByUsername(username);
        // console.log('User: ', user);

        if (user === null) {
            res.data.success = false;
            res.data.error = 'Username not present';
            return next();
        }

        if (user.email_verified === true) {
            res.data.success = false;
            res.data.error = 'Email of user already verified.'
            return next();
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

        console.log('Success: ', success);
        res.data.success = success;
        res.data.mail_sent = success;
    } catch (err) {
        console.error('ERROR: ', err);
        res.data.success = false;
        res.data.error = 'Some internal error.';
    } finally {
        return next();
    }
}