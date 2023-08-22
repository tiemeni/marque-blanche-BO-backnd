const router = require('express').Router();
const userController = require('../database/controllers/user.controller');
const auth = require('../middlewares/auth.middleware')
const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({ storage });

// GET
router.get('/', userController.getAllUsers);
router.get('/lieu/', userController.getPraticienByIdLieu);
router.get('/profession', userController.getUsersGroupByJob);
router.get('/:userid', userController.getUserById);

// POST
router.post('/signin', userController.signIn);
router.post('/register', userController.createUser);


// PATCH
router.patch('/:userid', userController.updateUserById);
router.put("/upload-photo/:userid", upload.single('photo'), userController.uploadPicture)
router.patch("/update-push-token/:userid", userController.updatePushToken)

// DELETE
router.delete('/', userController.deleteAllUsers);
router.delete('/:userid', userController.deleteUserById);

module.exports = router;
