const express = require('express');
const router = express.Router();
const userController = require('../../api/controllers/userController');

router.get('/:userid', userController.getUserById);

module.exports = router;