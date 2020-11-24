const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const googleKey = require('../../../config').key;
const User = require("../../../Models").User;

function getStrategy() {
    const googleStrategy = new GoogleStrategy({
            clientID: googleKey.googleClientID,
            clientSecret: googleKey.googleClientSecret,
            callbackURL: "http://localhost:5000/auth/google/callback",
        },
        (accessToken, refreshToken, profile, cb) => {
            // console.log(accessToken, refreshToken);
            // console.log("User : ", profile);
            User.findOrCreate({ google_id: profile.id }, function(err, user) {
                if (err) {
                    console.log("Error during signing-up with google : ", err);
                    return;
                } else {

                    if (user.google_setup.setup == false) {
                        User.getUniqueUsername(user.username || profile._json.name).then(
                            username => {

                                user.username = username;
                                user.profile_image = profile._json.picture;
                                user.first_name = profile._json.given_name;
                                user.last_name = profile._json.family_name;
                                user.google_setup.access_token = accessToken;
                                user.google_setup.refresh_token = refreshToken;
                                user.google_setup.setup = true;

                                return user.save(
                                    user => {
                                        console.log("User saved.");
                                        return cb(err, user)
                                    }
                                );
                            }
                        );
                    } else {
                        console.log('User already exists.');
                        return cb(err, user);
                    }
                }
            });
        });
    return googleStrategy;
}

module.exports = getStrategy;