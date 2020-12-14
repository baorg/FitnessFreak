const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const User = require("../../../Models").User;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, API_DOMAIN } = require('../../../config');

function getStrategy() {
    const google_callback_url = `${API_DOMAIN}/auth/google/callback`;

    const googleStrategy = new GoogleStrategy({
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: google_callback_url,
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