const Images = require('../model/ImagesModel');

exports.getImagesOfAProduct = function(req, res) {
    Images.getImagesOfAProduct(req.params.id, (err, images) => {
        if(err) {
            res.send(err);
        }
        
        res.json(images);
    });
};