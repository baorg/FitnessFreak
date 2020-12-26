const { Token, User } = require('../../../Models');

async function verifyUser(userId, type) {
    if (type === 'verify') {
        await User.updateOne({ id: userId }, { $set: { email_verified: true } }).exec();
        return { success: true, verified: true };
    } else {
        throw Error('Wrong token type');
    }
}

async function invalidToken() {
    return { success: false, verified: false };
}

module.exports = async function verify(req, res, next) {
    let { token } = req.query;
    // console.log("userid: ", userid, '\ntoken: ', token);
    let data = await Token.check_token(token, 'valid_email', verifyUser, invalidToken);

    res.data.success = data.success;
    res.data.verified = data.verified;

    return next();
}