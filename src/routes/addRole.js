const express = require('express');
const router = express.Router();
const roleController = require('../api/controllers/roleController');

router.post('/', roleController.handleNewRole);

module.exports = router;