const findOrCreate = require("mongoose-findorcreate");
const LocalStrategy = require("passport-local").Strategy;

const keys = require('../../../config/key');
const User = require("../../../Models").User;

function getStrategy() {
    // const localStragey = new LocalStrategy(
    //     function(username, password, done) {
    //         return User.findOrCreate({ username: username }, function(err, user) {
    //             if (err) { return done(err); }
    //             if (!user) { return done(null, false); }
    //             if (!user.verifyPassword(password)) { return done(null, false); }
    //             return done(null, user);
    //         });
    //     }
    // );

    // return localStragey;
    return User.createStrategy();
}

module.exports = getStrategy;