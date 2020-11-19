const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require('../../config/key');
const User = require("../../Models").User;
const findOrCreate = require("mongoose-findorcreate");

passport.use(new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "http://localhost:5000/auth/google/feed",
    },
    (accessToken, refreshToken, profile, cb) => {
        // console.log('Profile', profile);
        User.findOrCreate({ googleId: profile.id }, function(err, user) {
            if (!user.profileImage) {
                user.profileImage = profile._json.picture;
                user.save(
                    user => { return cb(err, user) }
                );
            } else
                return cb(err, user);
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id).select(['userName', 'firstName', 'lastName', 'createdAt', 'profileImage', 'bio'])
        .exec(function(err, user) {
            done(err, user);
        });
});