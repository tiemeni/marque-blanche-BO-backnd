const router = require('express').Router()
const centreController = require('../database/controllers/structure.controller');

router.post('/register', centreController.createStructure);
router.delete('/:centreId', centreController.deleteStructureById);
router.get('/', centreController.getAllStructures);
router.get('/:centreId', centreController.getStructureById);
router.put('/:centreId', centreController.updateStructureById);

module.exports = router;