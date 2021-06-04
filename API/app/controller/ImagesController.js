const Images = require('../model/ImagesModel');
const path = require('path');

exports.getImagesRoutes = function(req, res) {
    Images.getImagesRoutes(req.params.id, (err, images) => {
        if(err) {
            res.send(err);
        }
        
        for (let i = 0; i < images.length; i++) {
            let path = `http://localhost:3000/api/images/${images[i].image}`;
            images[i].image = path;
        }

        res.send(images);
    });
}

exports.getImage = function(req, res) {
    let pathRes = (path.resolve(`./assets/images/${req.params.image}`));
    res.sendFile(pathRes);
}

exports.saveImages = function(req, res) {
    let file = req.file;
    let image = new Images(req.params.id, file.filename);

    Images.saveImage(image, (err, image) => {
        if(err) {
            res.send(err);
        }
    
        res.send({ok: true});
    });
}
