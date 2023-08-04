const router = require('express').Router()
const professionController = require('../database/controllers/profession.controller')

router.post('/', professionController.createProfession)
router.get('/', professionController.getProfessions)
router.delete('/:idProfession', professionController.deleteProfessionById)

module.exports = router