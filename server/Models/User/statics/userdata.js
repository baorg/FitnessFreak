const mongoose = require('mongoose');

async function getUserData(user_id) {
    let user = await this.findOne({ _id: mongoose.Types.ObjectId(user_id) })
        .select(['username', 'first_name', 'last_name', 'created_at', 'profile_image', 'bio'])
        .exec();
    return user;
}


async function findUserByEmail(email) {
    let user = await this.findOne({ email }).select(['username', 'email']).exec();
    return user;
}

async function findUserByUserName(username) {
    let user = await this.findOne({ username: username }).select(['username', 'email']).exec();
    return user;
}

async function findUserByUserId(userId) {
    let user = await this.findOne({ _id: userId }).select(['username', 'email']).exec();
    return user.username;
}

function getRandInt(digits) {
    res = "";
    for (var i = 0; i < digits; i++)
        res += '5678901324' [(Math.random() * 10).toFixed(0) % 10];
    return res;
}

async function getUniqueUsername(username) {
    username = username.toLowerCase().replace(/\W/g, '_');
    let newUsername = username;
    while (await this.findUserByUserName(newUsername)) {
        newUsername = username + getRandInt(4);
    }
    return newUsername;
}

module.exports = {
    getUserData,
    getUniqueUsername,
    findUserByEmail,
    findUserByUserName,
    findUserByUserId
}