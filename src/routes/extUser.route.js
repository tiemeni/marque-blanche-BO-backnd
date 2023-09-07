const router = require('express').Router();
const userController = require('../database/controllers/user.controller');
const auth = require('../middlewares/auth.middleware')

// GET
router.get('/lieu', userController.getPraticienByIdLieu);
router.get('/:userid', userController.getUserById);
router.get('/', userController.getAllUsers);
router.get('/search/:searchKey', userController.searchPratByKey);
router.get('/searchBySpeciality/:searchKey', userController.searchPraticienByIdSpeciality);


// POST
router.post('/signin', userController.signIn);
router.post('/register', userController.createUser);
router.post('/process_verif_code', userController.processVerifCode);

// PATCH
router.patch('/:userid', userController.updateUserById);

// DELETE
router.delete('/:userid', userController.deleteUserById);

module.exports = router;