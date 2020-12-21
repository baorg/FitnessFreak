const { Token, User } = require('../../../Models');

async function verifyUser(user, type) {
    if (type === 'verify') {
        await User.updateOne({ id: user }, { $set: { is_verified: true } }).exec();
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
    let data = await Token.check_token(token, verifyUser, invalidToken);
    return res.send(data);
}