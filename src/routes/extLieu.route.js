const router = require('express').Router()
const lieuController = require('../database/controllers/lieux.controller');

router.get('/', lieuController.getAllLieux);
router.get('/:lieuId', lieuController.getLieuById);

module.exports = router;