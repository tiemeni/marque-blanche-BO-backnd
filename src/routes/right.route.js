const router = require('express').Router()
const rightController = require('../database/controllers/right.controller')

router.post('/', rightController.createRight);
router.get('/', rightController.getAllRights);
router.get('/:id', rightController.getOneRight);
router.patch('/:id', rightController.updateRight);

module.exports = router;