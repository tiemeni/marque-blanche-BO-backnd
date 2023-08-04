const router = require('express').Router();
const specialiteController = require('../database/controllers/specialty.controller')

//get
router.get('/', specialiteController.getAllSpecialties);
router.get('/profession/:idProfession', specialiteController.getSpecialitiesByIdProfession);
router.get('/:id', specialiteController.getOneSpecialty);
//post
router.post('/', specialiteController.createSpecialty);
//patch
router.patch('/:id', specialiteController.updateSpecialtyById);
//delete
router.delete('/:id', specialiteController.deleteSpecialtyById);

module.exports = router;