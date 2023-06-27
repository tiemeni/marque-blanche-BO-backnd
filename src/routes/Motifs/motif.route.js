const router = require('express').Router()
const motifController = require('../../database/controllers/motif.controller');

router.post('/register', motifController.createMotif);
router.delete('/:motifId', motifController.deleteMotifById);
router.get('/', motifController.getAllMotifs);
router.get('/:motifId', motifController.getMotifById);
router.put('/:motifId', motifController.updateMotifById);

module.exports = router;