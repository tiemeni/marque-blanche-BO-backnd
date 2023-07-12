const router = require('express').Router()
const patientController = require('../database/controllers/patient.controller');

router.post('/register', patientController.createPatient);
router.delete('/:patientId', patientController.deletePatientById);
router.get('/', patientController.getAllPatients);
router.get('/:patientId', patientController.getPatientById);
router.put('/:patientId', patientController.updatePatient);

module.exports = router;