const router = require('express').Router()
const groupController = require('../database/controllers/group.controller')

router.post('/', groupController.createGroup)
router.get('/', groupController.getAllGroup)
router.get('/:id', groupController.getGroupById)
router.patch('/:id', groupController.updateGroup)

module.exports = router