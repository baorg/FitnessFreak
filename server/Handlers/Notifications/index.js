const { User } = require('../../Models');
const { getNotifications, createNotification, seenNotification } = require('./helpers');

function getNotificationsHandler(req, res, next) {
    let user = req.user;
    return getNotifications(user._id)
        .then(({ notifications, count, new_count }) => {
            res.data.success = true;
            res.data.notifications = notifications;
            res.data.count = count;
            res.data.new_count = new_count;
        })
        .catch(err => {
            console.error("ERROR: ", err);
            res.data.success = false;
            res.data.error = 'Some internal error.';
        }).finally(() => {
            return next();
        });
}


function seenNotificationHandler(req, res, next) {
    let { id } = req.body;
    let user_id = req.user._id;
    seenNotification(user_id, id)
        .then(data => {
            res.data.success = true;
        }).catch(err => {
            console.error("ERROR: ", err);
        }).finally(() => {
            return next();
        });
}

module.exports = {
    getNotificationsHandler,
    seenNotificationHandler,
};