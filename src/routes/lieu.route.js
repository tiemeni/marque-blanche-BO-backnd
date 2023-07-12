const router = require('express').Router()
const lieuController = require('../database/controllers/lieux.controller');

router.post('/register', lieuController.createLieu);
router.delete('/:lieuId', lieuController.deleteLieuById);
router.get('/', lieuController.getAllLieux);
router.get('/:lieuId', lieuController.getLieuById);
router.put('/:lieuId', lieuController.updateLieuById);

module.exports = router;