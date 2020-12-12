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
        // console.log(user, user.id, user._id);
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id).select(['username', 'first_name', 'last_name', 'created_at', 'profile_image', 'bio'])
            .exec(function(err, user) {
                done(err, user);
            });
    });
    app.use(passport.initialize());
    app.use(passport.session());
}

module.exports = setup;