const { Ques, Ans, User, Tag } = require("../../Models");

module.exports.getNotifications = async function(req, res, next) {
    try {
        let user = await User.findById(req.user.id, { _is: 1, notifications: { $slice: -20 } }).exec();
        res.data.notifications = user.notifications;
        res.data.success = true;
    } catch (err) {
        console.error('ERROR:', err);
        res.data.success = false;
        res.data.error = 'Some internal error.';
    } finally {
        return next();
    }
}