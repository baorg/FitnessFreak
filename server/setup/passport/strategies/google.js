const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const googleKey = require('../../../config').key;
const User = require("../../../Models").User;

function getStrategy() {
    const googleStrategy = new GoogleStrategy({
            clientID: googleKey.googleClientID,
            clientSecret: googleKey.googleClientSecret,
            callbackURL: `${process.env.API_DOMAIN}/auth/google/callback`;
        },
        async(accessToken, refreshToken, profile, cb) => {
            // console.log(accessToken, refreshToken);
            // console.log("User : ", profile);
            try {
                let user = await User.findOne({ google_id: profile.id }).exec();
                if (user === null) {
                    let username = await User.getUniqueUsername(profile._json.name);

                    user = new User({
                        google_id: profile.id,
                        username: username,
                        profile_image: profile._json.picture,
                        first_name: profile._json.given_name,
                        last_name: profile._json.family_name,
                        google_setup: {
                            access_token: accessToken,
                            refresh_token: refreshToken,
                            setup: true
                        },
                    });

                    await user.save();
                }
                return cb(null, user);
            } catch (err) {
                return cb(err, null);
            }

        });
    return googleStrategy;
}

module.exports = getStrategy;