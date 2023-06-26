const router = require('express').Router()
const patientController = require('../../database/controllers/patient.controller');

router.post('/', patientController.createPatient);
// router.delete('/:userId', patientController.deletePracticienById);
// router.get('/', patientController.getAllPracticien);
// router.put('/userId', patientController.updatePracticienById);

module.exports = router;