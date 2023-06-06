const express = require('express');
const router = express.Router();
const roleController = require('../../api/controllers/roleController');

router.get('/', roleController.getAllRoles);

module.exports = router;