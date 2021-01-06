const passport = require('passport');
const { validationResult } = require('express-validator');
const { User } = require('../../../Models');
const createVerification = require('../Verification/create_verification');

module.exports = function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ success: false, errors: errors.array() });
    }

    const {
        username,
        firstname,
        lastname,
        email,
        password1,
        password2
    } = req.body;


    return User.register({ username: username, email: email, first_name: firstname, last_name: lastname },
        password1,
        function(err, user) {
            if (err) {
                return res.send({ success: false, errors: [], registered: false });
            } else {
                createVerification(user)
                    .then(async function(data) {
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
                        data.email_verification_mail_sent = success;
                        return res.send(data);
                    })
                    .catch(function(err) {
                        console.error('ERROR: ', err);
                        return res.send({ success: false, registered: false });
                    });
            }
        });

}