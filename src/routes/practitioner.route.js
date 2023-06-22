const router = require('express').Router()
const practicienController = require('../database/controllers/practitioner.controller')

router.post('/', practicienController.handleNewPracticien);
router.delete('/:userId', practicienController.deletePracticienById);
router.get('/', practicienController.getAllPracticien);
router.put('/userId', practicienController.updatePracticienById);

module.exports = router;