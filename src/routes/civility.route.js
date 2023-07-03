const router = require('express').Router()
const civilityController = require('../database/controllers/civility.controller')

router.post('/', civilityController.createCivility)
router.get('/', civilityController.getCivilities)

module.exports = router