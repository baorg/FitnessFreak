const { User } = require('../../Models');

module.exports = function(req, res, next) {
    const userId = req.body.user_id;
    console.log('body:', req.body);
    User.getUserData(userId).then(
        (user) => { return res.send({ user, isAuthenticated: true }); }
    ).catch(
        err => {
            console.log('ERROR:', err);
            res.send({ success: false, isAuthenticated: true })
        }
    );
}