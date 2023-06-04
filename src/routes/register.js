const express = require('express');
const router = express.Router();
const userController = require('../api/controllers/userController');
const handleUpload = require('../api/middlewares/uploadMiddleware');


router.post('/', handleUpload.single("photo"), userController.handleNewUser);

module.exports = router;