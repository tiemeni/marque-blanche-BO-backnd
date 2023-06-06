const express = require('express');
const router = express.Router();
const userController = require('../../api/controllers/userController');

router.delete('/:userid', userController.deleteUserById);

module.exports = router