const express = require('express');
const router = express.Router();
const specialiteController = require('../../api/controllers/specialiteController');

router.delete('/:specialiteid', specialiteController.deleteSpecialiteById);

module.exports = router;