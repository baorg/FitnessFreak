const FacebookStrategy = require("passport-facebook").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const { User } = require("../../../Models");

const { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, API_DOMAIN } = require('../../../config');


function getStrategy() {
    const facebook_callback = `${API_DOMAIN}/auth/facebook/callback`;

    const facebookStrategy = new FacebookStrategy({
            clientID: FACEBOOK_APP_ID,
            clientSecret: FACEBOOK_APP_SECRET,
            callbackURL: facebook_callback,
            enableProof: true,
            profileFields: ['id', 'displayName', 'photos', 'email']
        },
        async function(accessToken, refreshToken, profile, cb) {
            try {
                let user = await User.findOne({ facebook_id: profile.id }).exec();
                if (user === null) {
                    let username = await User.getUniqueUsername(profile._json.name);

                    user = new User({
                        username: username,
                        facebook_id: profile.id,
                        profile_image: profile._json.picture ? profile._json.picture.data.url : null,
                        // profile_image: profile._json.picture,
                        // first_name: profile._json.given_name,
                        // last_name: profile._json.family_name
                    });

                    await user.save();
                }
                // console.log('User profile: ', user.profile_image);
                if ((!user.profile_image) && profile._json.picture) {
                    // console.log('Facebook profile: ', profile._json);
                    user.profile_image = profile._json.picture ? profile._json.picture.data.url : null;
                    await user.save();
                }
                return cb(null, user);
            } catch (err) {
                return cb(err, null);
            }
        });

    return facebookStrategy;
}

module.exports = getStrategy;