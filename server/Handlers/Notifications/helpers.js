const mongoose = require('mongoose');
const { User, Ques, Ans } = require('../../Models');
const { CLIENT_DOMAIN } = require('../../config');

async function createNotification(actor_id, notifier_id, entity, entity_data_id) {

    /*
        actor: User to which notification will be sent.
        notifier: User which causes notification.
        entity: type of notification (
                    1: followed
                    2: answered
                    3: commented
                    4: Upvoted question
            )
        
        entity_data_id: Id for the entity type (e.g. answer_id for entity answer)
        
        status: Status of notification (
            0: registered
            1: sent
            2: seen
        )
    */

    // actor_id = actor_id.toString();
    const { User } = require('../../Models');
    let user = await User.findOne({ _id: actor_id }, 'notifications').exec();
    let l = user.notifications.length;
    if (l >= 50) {
        user.notifications.shift(l - 50 + 1);
        l = 49;
    }
    user.notifications.push({
        notifier: notifier_id,
        entity: entity,
        entity_data: entity_data_id,
        status: 0,
        created_timestamp: new Date(Date.now()),
        seen_timestamp: null,
        _id: mongoose.Types.ObjectId()
    });

    user = await user.save();
    return user;
}

async function clearNotifications(actor_id) {
    const { User } = require('../../Models');
    let user = await User.findOne({ _id: actor_id }, 'notifications').exec();
    user.notifications = [];

    await user.save();
    return user;
}

async function serializeNotification(notification) {
    const { User } = require('../../Models');
    let user = await User.findOne({ _id: notification.notifier }, 'username first_name last_name').exec();
    // console.log('User: ', user);
    switch (notification.entity) {
        case 1:
            return ({
                id: notification._id.toString(),
                text: `@${user.username} started following you.`,
                url: `/profile/${user._id}`,
                dated: notification.created_timestamp,
                sent: notification.status == 1,
                seen: notification.status == 2
            });
        case 2:
            return ({
                id: notification._id.toString(),
                text: `${user.first_name} ${user.last_name} answered your question.`,
                url: `/answer/${notification.entity_data}`,
                dated: notification.created_timestamp,
                sent: notification.status == 1,
                seen: notification.status == 2
            });
        case 3:
            return ({
                id: notification._id.toString(),
                text: `${user.first_name} ${user.last_name} commented on your answer.`,
                url: `/answer/${notification.entity_data}`,
                dated: notification.created_timestamp,
                sent: notification.status == 1,
                seen: notification.status == 2
            });
        case 4:
            return ({
                id: notification._id.toString(),
                text: `${user.first_name} ${user.last_name} commented on your answer.`,
                url: `/viewFullQuestion/${notification.entity_data}`,
                dated: notification.created_timestamp,
                sent: notification.status == 1,
                seen: notification.status == 2
            })
        default:
            return ({
                text: 'Invalid notification.',
                url: '#',
                dated: new Date(Date.now())
            });
    }
}


async function getNotifications(user_id) {
    const { User } = require('../../Models');

    let user = await User.findOne({ _id: user_id }, 'notifications').exec();
    let new_notifs = [];
    let old_notifs = [];

    for (var i = 0; i < user.notifications.length; i++) {
        if (user.notifications[i].status == 0)
            new_notifs.push(await serializeNotification(user.notifications[i]));
        else
            old_notifs.push(await serializeNotification(user.notifications[i]));

        user.notifications[i].status = 1;
    }
    await user.save();

    return {
        notifications: [...new_notifs, ...old_notifs],
        count: user.notifications.length,
        new_count: new_notifs.length
    };
}


async function seenNotification(user_id, notification_id) {
    const { User } = require('../../Models');

    let user = await User.findOne({ _id: user_id }, 'notifications').exec();
    let index = user.notifications.findIndex((val) => val._id == notification_id);

    user.notifications = user.notifications.filter((val, i) => i !== index);

    await user.save();

    return true;

}


async function handleChange(userId, quesId, sign, name, property) {
    console.log('Change - ', sign, name, property);
    return;
}

module.exports = {
    getNotifications,
    createNotification,
    serializeNotification,
    clearNotifications,
    seenNotification,
    handleChange
}