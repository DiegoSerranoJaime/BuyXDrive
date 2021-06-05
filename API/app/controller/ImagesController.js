const Images = require('../model/ImagesModel');
const fs = require('fs').promises;
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

    Images.saveImage(image, (err, images) => {
        if(err) {
            res.send(err);
        }

        for (let i = 0; i < images.length; i++) {
            let path = `http://localhost:3000/api/images/${images[i].image}`;
            images[i].image = path;
        }
        
        res.send({ok: true, data: images});
    });
}

exports.delete = function(req, res) {
    Images.delete(req.params, (err, images) => {
        if(err) {
            res.send(err);
        }

        let image = `./assets/images/${req.params.name}`;

        fs.unlink(image).then();

        for (let i = 0; i < images.length; i++) {
            let path = `http://localhost:3000/api/images/${images[i].image}`;
            images[i].image = path;
        }

        res.send({ok: true, data: images});
    });
}
