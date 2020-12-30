const { Token, User } = require('../../../Models');
const CONFIG = require('../../../config');


async function verifyUserEmail(userId, type) {
    if (type === 'verify_email') {
        let r = await User.updateOne({ _id: userId }, { $set: { email_verified: true } }).exec();
        console.log('Update: ', r);
        return { success: true, verified: true };
    } else {
        throw Error('Wrong token type');
    }
}

async function invalidToken(err) {
    return { success: false, verified: false, error: err };
}

module.exports.verifyEmailHandler = async function(req, res, next) {
    let { token } = req.query;
    // console.log("userid: ", userid, '\ntoken: ', token);
    let data = await Token.check_token(token, 'verify_email', verifyUserEmail, invalidToken);

    if (data.success && data.verified) {
        return res.redirect(`${CONFIG.CLIENT_DOMAIN}/verify-email/verified`);
    } else {
        if (data.error === 'Token Expired') {
            return res.redirect(`${CONFIG.CLIENT_DOMAIN}/verify-email/token-expired`);
        } else {
            return res.redirect(`${CONFIG.CLIENT_DOMAIN}/verify-email/invalid-token`);
        }
    }
}