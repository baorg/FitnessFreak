const { NotificationsHandler } = require('./../Handlers');

const express = require("express");
const router = express.Router();
const { response } = require('../Middlewares');

const isAuthenticated = require('../Middlewares').isAuthenticated;

router.get('/get-notifs', isAuthenticated, NotificationsHandler.getNotificationsHandler);
router.post('/set-seen', isAuthenticated, NotificationsHandler.seenNotificationHandler);


module.exports = router;