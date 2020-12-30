const { User } = require('../../Models');
const { UserSerializers } = require('../../Serializers');

module.exports = function(req, res, next) {
    res.data.success = true;
    res.data.user = UserSerializers.editProfileUserSerializer(req.user);
    return next();
}