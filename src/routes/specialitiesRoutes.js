const router = require('express').Router();
const specialiteController = require('../database/controllers/specialiteController')

router.get('/', specialiteController.getAllSpecialite);
router.post('/', specialiteController.handleNewSpecialite);
router.delete('/:specialiteId', specialiteController.deleteSpecialiteById);
router.delete('/:specialiteId', specialiteController.updateSpecialiteById);

module.exports = router;