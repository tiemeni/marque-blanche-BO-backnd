const express = require('express');
const router = express.Router();
<<<<<<< HEAD:src/routes/userRoutes/register.js
const userController = require('../../api/controllers/userController');
=======
const userController = require('../api/controllers/userController');
const handleUpload = require('../api/middlewares/uploadMiddleware');
>>>>>>> 9e7cab8cb637519e3bc5709434c4ce83b92270a5:src/routes/register.js


router.post('/', handleUpload, userController.handleNewUser);

module.exports = router;