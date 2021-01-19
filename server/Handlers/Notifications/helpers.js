const mongoose = require('mongoose');
const { User, Ques, Ans } = require('../../Models');
const { CLIENT_DOMAIN } = require('../../config');

async function create_notification(actor_id, notifier_id, entity, entity_data_id) {

    // console.log(actor_id, notifier_id, entity, entity_data_id);
    // console.log(typeof(actor_id), typeof(notifier_id), typeof(entity_data_id));


    /*
        actor: User to which notification will be sent.
        notifier: User which causes notification.
        entity: type of notification (
                    1: followed
                    2: answered
                    3: commented
            )
        
        entity_data_id: Id for the entity type (e.g. answer_id for entity answer)
        
        status: Status of notification (
            0: registered
            1: sent
            2: seen
        )
    */

    let user = await User.findOne({ _id: actor_id }, 'notifications unseen_notifications').exec();
    user.notifications.push({
        notifier: notifier_id,
        entity: entity,
        entity_data: entity_data_id,
        status: 0,
        created_timestamp: new Date(Date.now()),
        seen_timestamp: null
    });
    user.unseen_notifications++;

    user.save();
    return user;
}

async function clear_notifications(actor_id) {
    let user = await User.findOne({ _id: actor_id }, 'notifications unseen_notifications').exec();
    user.notifications = [];
    user.unseen_notifications = 0;

    await user.save();
    return user;
}

async function serialize_notification(notification) {
    let user = await User.findOne({ _id: notification.notifier }, 'username first_name last_name').exec();
    // console.log('User: ', user);
    switch (notification.entity) {
        case 1:
            return ({
                text: `@${user.username} started following you.`,
                url: `${CLIENT_DOMAIN}/profile/${user._id}`,
                dated: notification.created_timestamp
            });
        case 2:
            return ({
                text: `${user.first_name} ${user.last_name} answered your question.`,
                url: `${CLIENT_DOMAIN}/viewFullQuestion/${notification.entity_data}`,
                dated: notification.created_timestamp
            });
        case 3:
            return ({
                text: `${user.first_name} ${user.last_name} commented on your answer.`,
                url: `${CLIENT_DOMAIN}/view-answer/${notification.entity_data}`,
                dated: notification.created_timestamp
            });

        default:
            return ({
                text: 'Invalid notification.',
                url: '#',
                dated: new Date(Date.now())
            });
    }
}


async function get_notifications(user_id, limit = 10, page = 1) {
    if (page < 1)
        page = 1;

    let user = await User.findOne({ _id: user_id }, 'notifications unseen_notifications').exec();
    let notifs = [];

    for (var i = user.notifications.length - 1 - (page - 1) * limit; i >= 0 && i >= user.notifications.length - 1 - page * limit; i--) notifs.push(await serialize_notification(user.notifications[i]));

    return { notifications: notifs, unseen: user.unseen_notifications };
}



module.exports = {
    get_notifications,
    create_notification,
    serialize_notification,
}