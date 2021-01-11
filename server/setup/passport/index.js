const passport = require("passport");
const { set } = require("../../Models/User/schema");
const { getGoogleStrategy, getLocalStrategy, getFacebookStrategy } = require('./strategies');
const { User } = require('../../Models');

async function setup(app) {
    const googleStrategy = getGoogleStrategy();
    const localStrategy = getLocalStrategy();
    const facebookStrategy = getFacebookStrategy();

    passport.use(localStrategy);
    passport.use(googleStrategy);
    passport.use(facebookStrategy);

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findOne({ _id: id })
            .select(['username', 'first_name', 'last_name', 'email', 'created_at', 'profile_image', 'banner_image', 'bio', 'chosen_category', 'is_verified', 'email_verified', 'score'])
            .exec(function(err, user) {
                if (err) {
                    console.error('ERROR:', err);
                    done(err, user);
                } else {
                    done(err, user);
                }
            });
    });
    app.use(passport.initialize());
    app.use(passport.session());
}

module.exports = setup;