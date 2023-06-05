const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Math.random() * 1e9}-${Date.now()}${path.extname(file.originalname)}`)
    }
});
const handleUploadMultipart = multer({ 
    storage: storage,
    limits: { fileSize: 1000000 * 5 }
}).single("photo");

module.exports = handleUploadMultipart;