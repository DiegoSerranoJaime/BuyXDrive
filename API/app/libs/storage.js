const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets/images');
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        let name = `${uuidv4()}${ext}`;
        cb(null, name);
    }
});
   
const upload = multer({ storage: storage })

module.exports = upload;