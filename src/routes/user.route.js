const router = require('express').Router();
const userController = require('../database/controllers/user.controller');
const auth = require('../middlewares/auth.middleware')

// GET
router.get('/', userController.getAllUsers);
router.post('/signin', userController.signIn);
router.get('/:userid', auth, userController.getUserById);

// POST
router.post('/register', userController.createUser);

// PATCH
router.patch('/:userid', auth, userController.updateUserById);

// DELETE
router.delete('/', auth, userController.deleteAllUsers);
router.delete('/:userid', auth, userController.deleteUserById);

module.exports = router;
