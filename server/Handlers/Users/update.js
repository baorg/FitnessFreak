const { User, Token } = require('../../Models');
const { validationResult } = require('express-validator');
const sendMail = require('../utils/mailer');
const { API_DOMAIN, CLIENT_DOMAIN, category: categories } = require('../../config');

const format_response = require('../utils/format_response');
const hideEmail = require('../utils/hide_email');

async function requestUpdateEmail(req, res, next) {
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
        let token = await Token.create_token(user, 'update_email', email);

        // Send mail

        let response = {
            body: {
                name: user.username,
                intro: `Hi! friend you have requested to change your email from ${hideEmail(user.email)} to ${email}.`,
                action: {
                    instructions: 'To Change your email, please click here:',
                    button: {
                        color: '#22BC66', // Optional action button color
                        text: 'Confirm your email',
                        link: `${CLIENT_DOMAIN}/update-user-email?token=${token.token}`
                    }
                },
                outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
            }
        };
        let success = await sendMail(email, 'Verify Email', response);
        console.log('Success:', success);

        res.data.success = true;
        res.data.user = user;
        res.data.sent_email = success;
    } catch (err) {
        console.error('ERROR: ', err);
        res.data.success = false;
        res.data.error = 'Some internal error.';
    } finally {
        return next();
        // return res.redirect(CLIENT_DOMAIN)
    }

}

async function updateEmail(req, res, next) {
    try {
        // Get token
        let token_ = req.body.token;
        let { token, error } = await Token.get_token(token_, 'update_email');
        if (token === null) {
            res.data.success = false;
            res.data.error = error;
        } else {
            res.data.success = true;

            console.log('Token: ', token);
            let new_email = token.email;
            let user = token.user;
            let prev_email = user.email;

            user.email = new_email;
            user.email_verified = true;
            await user.save();

            // Send mail to previous email.
            let response = {
                body: {
                    name: user.username,
                    intro: `Hi ${user.first_name} ${user.last_name}, your email have been changed to ${hideEmail(new_email)}`,
                    outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
                }
            };
            let success = await sendMail(prev_email, 'Email updated', response);
            console.log('Success: ', success);

            //  Send mail to new email.
            response = {
                body: {
                    name: user.username,
                    intro: `Hi ${user.first_name} ${user.last_name}, your email have been changed from ${hideEmail(prev_email)} tp this new email.`,
                    outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
                }
            };
            success = await sendMail(new_email, 'Email updated', response);
            console.log('Success: ', success);
            //  ------------------------------------------------------------------------------

            res.data.success = true;
            res.data.email_updated = true;
            res.new_email = user.email;

        }
    } catch (err) {
        console.error('ERROR: ', err);
        res.data.success = false;
        res.data.error = 'Some internal error.';
    } finally {
        // return next();
        return res.redirect(CLIENT_DOMAIN);
    }
}


async function updateProfile(req, res, next) {
    let success = false;
    let data = {};
    let error = null;

    try {
        let user = req.user;
        // console.log('data:', req.body);
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
        format_response(res, data, success, error);
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
        format_response(res, data, success, error);
        return next();
    }
}


async function updateChosenCategory(req, res, next){
    let success = false;
    let data = {};
    let error = null;

    try{
        let { category, on } = req.query;
        on = (on==='true'?true:on==='false'?false:null);
        let chosen_categories = req.user.chosen_category;
        data = {
            chosen_category: chosen_categories
        };
        
        if(categories.some(cat=>cat===category) && (on===false || on===true)){
            if(on){
                if(chosen_categories.length>=2){

                }else{
                    chosen_categories.push(category);
                }

            }else{
                chosen_categories = chosen_categories.filter(cat=>cat!=category);
            }

            req.user.chosen_category = chosen_categories;
            await req.user.save();
            data = {
                chosen_category: req.user.chosen_category
            };
        }else{
            success = false;
            error = "Invalid input";
        }
    }catch(err){
        success = false;
        error = "Some internal error.";
        console.error('ERROR: ', err);
    }finally{
        format_response(res, data, success, error);
        return next();
    }
}

module.exports = {
    requestUpdateEmail,
    updateProfile,
    updateEmail,
    updateImage,
    updateChosenCategory
};