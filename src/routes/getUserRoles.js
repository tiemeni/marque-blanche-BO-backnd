const express = require('express');
const router = express.Router();
const userController = require('../api/controllers/userController');

router.get('/:usermail', userController.getUserRoles);

module.exports = router;