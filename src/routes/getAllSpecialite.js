const express = require('express');
const router = express.Router();
const specialiteController = require('../api/controllers/specialiteController');

router.get('/', specialiteController.getAllSpecialite);

module.exports = router;