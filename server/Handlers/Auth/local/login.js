const passport = require('passport');
const { validationResult } = require('express-validator');
const { User } = require('../../../Models');


module.exports = function(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.send({ success: false, errors: errors.array() });
    }

    return passport.authenticate('local', function(err, user, info) {
        if (err) { 
            console.error('ERROR: ', err);
            return res.send({ 
                        success: false, 
                        authenticated: false, 
                        error: 'Some internal error.' });
        }
        if (!user) {
            return res.send({ 
                success: false, 
                authenticated: false, 
                error: info.message });
        }
        req.logIn(user, function(err) {
            if (err) { 
                console.error('ERROR: ', err);
                return next(err); 
            }
            return res.send({ success: true, authenticated: true, user: req.user });
        });
      })(req, res, next);
}