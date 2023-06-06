const express = require('express');
const router = express.Router();
const specialiteController = require('../../api/controllers/specialiteController');

router.put('/:specialiteid', specialiteController.updateSpecialiteById);

module.exports = router;