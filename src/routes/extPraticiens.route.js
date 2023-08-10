 const router = require('express').Router()
const practicienController = require('../database/controllers/practitioner.controller')

router.get('/', practicienController.getAllPracticien);

module.exports = router;