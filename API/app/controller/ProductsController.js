const Products = require('../model/ProductsModel');

exports.getProductCart = function(req, res) {
    Products.getProductCart(req.params.id, (err, product) => {
        if(err) {
            res.send(err);
        }
        
        product = imageRoute(product);

        res.json(product);
    });
};

imageRoute = function(data) {
    for (let i = 0; i < data.length; i++) {
        data[i].image = 'http://localhost:3000/api/images/' + data[i].image;
    }

    return data;
}