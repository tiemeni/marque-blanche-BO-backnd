const express = require('express');
const router = express.Router();
const practicienControl = require('../api/controllers/practicienController');

router.get('/:usermat', practicienControl.getPracticienWithSpecialite);

module.exports = router;