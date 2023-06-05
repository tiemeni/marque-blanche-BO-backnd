const express = require('express');
const router = express.Router();
const practicienControl = require('../api/controllers/practicienController');

router.post('/', practicienControl.handleNewPracticien);

module.exports = router;