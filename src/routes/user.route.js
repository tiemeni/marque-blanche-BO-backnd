const router = require('express').Router();
const userController = require('../database/controllers/user.controller');
const auth = require('../middlewares/auth.middleware')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: '/src/uploads/', // Répertoire où les fichiers seront enregistrés
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});
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
router.patch('/upload-photo/:userid', upload.single('photo'), userController.uploadPicture)

// DELETE
router.delete('/', userController.deleteAllUsers);
router.delete('/:userid', userController.deleteUserById);

module.exports = router;
