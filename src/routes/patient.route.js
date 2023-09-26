const router = require('express').Router()
const patientController = require('../database/controllers/patient.controller');

router.post('/register', patientController.createPatient);
router.delete('/:patientId', patientController.deletePatientById);
router.get('/', patientController.getAllPatients);
router.get('/search/', patientController.searchPatientsByKey);
router.get('/:patientId', patientController.getPatientById);
router.get('/name/:key', patientController.getPatientByName);
router.put('/:patientId', patientController.updatePatient);
router.delete('/', patientController.deleteAll);

module.exports = router;