const router = require('express').Router();
const userController = require('../database/controllers/user.controller');
const auth = require('../middlewares/auth.middleware')

// GET
router.get('/:userid', userController.getUserById);

// POST
router.post('/signin', userController.signIn);
router.post('/register', userController.createUser);

// PATCH
router.patch('/:userid', userController.updateUserById);

// DELETE
router.delete('/:userid', userController.deleteUserById);

module.exports = router;