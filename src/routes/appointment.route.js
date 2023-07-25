const router = require('express').Router()
const appointementController = require('../database/controllers/appointment.controller')

router.get('/', appointementController.getAppointments)
router.post('/enregistrer_rdv', appointementController.makeAppointment)
router.get('/rechercher_dispo', appointementController.searchAvailabilities)
router.delete('/', appointementController.deleteAll)

module.exports = router