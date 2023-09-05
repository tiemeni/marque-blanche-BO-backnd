const router = require('express').Router()
const notificationController = require('../database/controllers/notification.controller')

router.post('/', notificationController.createNofitication);
router.get('/', notificationController.getNotifications);

module.exports = router