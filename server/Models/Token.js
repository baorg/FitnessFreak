const mongoose = require("mongoose");
const { User } = require('./User');
const _ = require('lodash');

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        maxlength: 40,
        minlength: 40,
        unique: true,
    },
    generate_timestamp: {
        type: Date,
        default: Date.now
    },
    expire_timestamp: {
        type: Date,
        default: () => Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: User,
        required: true
    },
    token_type: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: null
    }
});

// ===========================================================================================================

// statics

async function create_token(user, t_type, email = null, r_depth = 0) {
    let l = 40;
    let cache = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token;

    if (user == null || t_type == null)
        throw Error('User and token type are required.');
    if (!['verify_email', 'password_reset', 'update_email'].some(tp => tp === t_type))
        throw Error('Invalid token type.');

    try {
        let tkn = '';
        for (let i = 0; i < l; i++) {
            tkn += cache[_.random(0, 61)];
        }
        token = await this.create({ token: tkn, user: user, token_type: t_type, email: email });
        console.log('Token: ', token);
    } catch (err) {

        console.log('ERROR: ', err);
        if (r_depth >= 20) {
            console.error('Recursion depth reached. Look into your apis.');
            throw err;
        }
        token = await this.create_token(user, t_type, email, r_depth + 1);

    } finally {
        return token;
    }
}

async function check_token(tk, vt, cb, fb) {
    let token = await Token.findOne({ token: tk }).exec();
    if (token) {
        // token expired.
        if (token.expire_timestamp < Date.now) {
            await token.delete();
            return await fb('Token Expired');
        }
        if (token.token_type !== vt) {
            console.error('ERROR: Invalid token type.');
            return await fb('Invalid Token');
        }
        // valid token
        let user = token.user;
        let type = token.token_type;

        await token.delete();
        return await cb(user, type);
    } else {
        // token doesn't exists
        return await fb('Invalid Token');
    }
}

async function get_token(token, vt) {
    let tok = await this.findOne({ token: token })
        .populate({
            path: 'user',
            model: User,
            select: 'username email first_name last_name'
        });
    if (tok !== null) {
        if (token.expire_timestamp < Date.now) {
            await tok.delete();
            return { token: null, error: 'Token Expired' };
        } else if (tok.token_type !== vt) {
            await tok.delete();
            return { token: null, error: 'Invalid token.' };
        } else {
            await tok.delete();
            return { token: tok, error: null };
        }
    } else {
        return { token: null, error: 'Invalid token.' };
    }
}

tokenSchema.statics = {
    create_token,
    check_token,
    get_token
};
// ===========================================================================================================


const Token = new mongoose.model('Token', tokenSchema);

module.exports = {
    Token,
    tokenSchema
}