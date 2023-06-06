const express = require('express');
const router = express.Router();
const specialiteController = require('../../api/controllers/specialiteController');


router.post('/', specialiteController.handleNewSpecialite);

module.exports = router;