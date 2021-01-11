const { User, Token } = require('../../Models');
const { validationResult } = require('express-validator');
const sendMail = require('../utils/mailer');
const { API_DOMAIN } = require('../../config');

const response_format = require('../utils/response_fromat');

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

    console.log('User: ', user);

    try {
        user.email = email;
        user.email_verified = false;
        user = await user.save();
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

        res.data.success = true;
        res.data.user = user;
        res.data.sent_email = success;
    } catch (err) {
        console.error('ERROR: ', err);
        res.data.success = false;
        res.data.error = 'Some internal error.';
    } finally {
        return next();
    }

}

async function updateProfile(req, res, next) {
    let success = false;
    let data = {};
    let error = null;

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

        success = false;
        data.updated = true;
        data.user = user;

    } catch (err) {
        console.err('ERROR: ', err);
        success = false;
        data.error = 'Some error occured in our end.';
        data.updated = false;
        error = 'Some internal error.';
    } finally {
        res.data = {
            ...res.data,
            ...response_format(success, data, error)
        }
        return next();
    }
}

async function updateImage(req, res, next) {
    let success = false;
    let data = {};
    let error = null;

    try {
        let { image_url, target } = req.body;

        if (target === 'profile' || target === 'banner') {
            if (target === 'profile') {
                let updated = await User.updateOne({ _id: req.user._id }, { $set: { profile_image: image_url } })
                    .exec();
                // console.log('Updated:', updated);
            } else {
                let updated = await User.updateOne({
                        _id: req.user._id
                    }, {
                        $set: { banner_image: image_url }
                    }).exec()
                    // console.log('Updated:', updated);
            }
        } else {
            error = 'Invalid request';
            throw Error(`Invalid target : ${target}`);
        }

    } catch (err) {
        console.error('ERROR:', err);
    } finally {
        res.data = {
            ...res.data,
            ...response_format(success, data, error)
        }
        return next();
    }
}

module.exports = {
    updateProfile,
    updateEmail,
    updateImage
};