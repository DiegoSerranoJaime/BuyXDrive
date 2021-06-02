const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets/images');
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        let name = `${Date.now()}${ext}`;
        cb(null, name);
    }
});
   
const upload = multer({ storage: storage })

module.exports = upload;