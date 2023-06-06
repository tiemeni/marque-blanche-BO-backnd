const express = require('express');
const router = express.Router();
const userController = require('../../api/controllers/userController');

router.put('/:userid', userController.updateUserNameById);

module.exports = router