const router = require('express').Router()
const appointementController = require('../database/controllers/appointment.controller')

router.get('/', appointementController.getAppointments)
router.post('/duplicate', appointementController.duplicateAppointment)
router.post('/enregistrer_rdv', appointementController.makeAppointment)
router.get('/rechercher_dispo', appointementController.searchAvailabilities)
router.put('/update/:idRdv', appointementController.upadteAppointment)
router.patch('/update', appointementController.updateExistingAppointments)
router.delete('/', appointementController.deleteAll)
router.delete('/:id', appointementController.deleteOne)

module.exports = router