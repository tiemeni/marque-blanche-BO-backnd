const router = require('express').Router();
const userController = require('../database/controllers/userController');

// GET
router.get('/', userController.getAllUsers);
router.get('/signin', userController.signIn);
router.get('/:userid', userController.getUserById);

// POST
router.post('/register', userController.handleNewUser);

// PUT
router.put('/:userid', userController.updateUserNameById);

// DELETE
router.delete('/:userid', userController.deleteUserById);

module.exports = router;