const express = require('express');
const router = express.Router();
const practicienControl = require('../../api/controllers/practicienController');

router.get('/', practicienControl.getAllPracticien);

module.exports = router;