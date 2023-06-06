const express = require('express');
const router = express.Router();
const practicienControl = require('../../api/controllers/practicienController');

router.delete('/:userid', practicienControl.deletePracticienById);

module.exports = router;