const router = require('express').Router()
const notificationController = require('../database/controllers/notification.controller')

router.post('/', notificationController.createNofitication);
router.get('/', notificationController.getNotifications);
router.get('/unread/', notificationController.getNumbersUnreadedNotifications);
router.patch('/', notificationController.markNotificationsAsReaded);

module.exports = router