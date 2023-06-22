const router = require('express').Router();
const userController = require('../database/controllers/user.controller');
const auth = require('../middlewares/auth.middleware')

// GET
router.get('/', auth, userController.getAllUsers);
router.get('/signin', userController.signIn);
router.get('/:userid', auth, userController.getUserById);

// POST
router.post('/register', userController.createUser);

// PUT
router.put('/:userid', auth, userController.updateUserNameById);

// DELETE
router.delete('/:userid', auth, userController.deleteUserById);

module.exports = router;