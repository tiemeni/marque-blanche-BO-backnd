const express = require('express');
const router = express.Router();
const userController = require('../../api/controllers/userController');

router.post('/', userController.handleNewUser);

module.exports = router;