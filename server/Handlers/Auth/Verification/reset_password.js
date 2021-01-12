const { validationResult } = require('express-validator');

const sendMail = require('../../utils/mailer')
const { User, Token } = require('../../../Models');
const { CLIENT_DOMAIN } = require('../../../config');
const hideEmail = require('../../utils/hide_email');


async function reset_password(userId, type, password) {
    if (type === 'password_reset') {
        try {
            let user = await User.findOne({ _id: userId }).exec();
            await user.setPassword(password);
            user.save();
            return { success: true, password_reset: true };
        } catch (err) {
            console.error('ERROR:', err);
            return { error: 'Some internal error.', success: false };
        }
    } else {
        throw Error('Wrong token type');
    }
}

async function invalid_token(err) {
    return { success: false, verified: false, error: err };
}


module.exports.resetPassword = async(req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.data.success = false;
            res.data.errors = errors.array();
            return next();
        }
        const { password1, password2, token } = req.body;

        let data = await Token.check_token(token, 'password_reset', async(userId, type) => await reset_password(userId, type, password1), invalid_token);
        res.data = data;
    } catch (err) {
        res.data.success = false;
        res.data.error = 'Some internal error.';
    } finally {
        return next();
    }
}


module.exports.requestRestPassword = async(req, res, next) => {
    try {
        let { username = "" } = req.query;
        // console.log('username: ', username);
        let user = (await User.findByUsername(username)) || (await User.findUserByEmail(username));

        if (user === null) {
            res.data.success = false;
            res.data.error = 'Username / Email not present';
        } else {
            let token = await Token.create_token(user, 'password_reset');
            // console.log('Token:', token);
            let response = {
                body: {
                    name: user.username,
                    intro: 'Welcome to Fitness Freak! We\'re very excited to have you on board.',
                    action: {
                        instructions: 'To change your password, please click here:',
                        button: {
                            color: '#22BC66', // Optional action button color
                            text: 'Reset your password',
                            link: `${CLIENT_DOMAIN}/auth/reset-password?token=${token.token}`
                        }
                    },
                    outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
                }
            };
            let success = await sendMail(user.email, 'Reset Password', response);
            // console.log('Success: ', success);
            res.data.success = success;
            res.data.mail_sent = success;
            res.data.email = hideEmail(user.email);
        }
    } catch (err) {
        console.error('ERROR:', err);
        res.data.success = false;
        res.data.error = 'Internal Server error';
    } finally {
        return next();
    }

}