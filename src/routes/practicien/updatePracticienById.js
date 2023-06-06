const express = require('express');
const router = express.Router();
const practicienControl = require('../../api/controllers/practicienController');

router.put('/:userid', practicienControl.updatePracticienById);

module.exports = router;