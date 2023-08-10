const router = require('express').Router();
const specialiteController = require('../database/controllers/specialty.controller')

//get
router.get('/', specialiteController.getAllSpecialties);
router.get('/profession/:idProfession', specialiteController.getSpecialitiesByIdProfession);
router.get('/:id', specialiteController.getOneSpecialty);

module.exports = router;