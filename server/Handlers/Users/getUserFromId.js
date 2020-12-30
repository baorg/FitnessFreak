const { User } = require('../../Models');
const { UserSerializers } = require('../../Serializers')
module.exports = function(req, res, next) {
    const userId = req.body.user_id;
    // console.log('body:', req.body);
    User.getUserData(userId).then(
        (user) => {
            res.data.success = true;
            res.data.user = UserSerializers.UserSerializer(user);
            return next();
        }
    ).catch(
        err => {
            console.log('ERROR:', err);
            res.data.success = false;
            res.data.error = 'Internal Server error.';
            return next();
        }
    );
}