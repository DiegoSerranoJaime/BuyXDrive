const Products = require('../model/ProductsModel');
const jwt = require('jsonwebtoken');

exports.getAll = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            Products.getAll((err, products) => {
                if(err) {
                    res.send(err);
                }
                        
                res.json(products);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}

exports.getProductCart = function(req, res) {
    Products.getProductCart(req.params.id, (err, product) => {
        if(err) {
            res.send(err);
        }
        
        product = imageRoute(product);

        res.json(product);
    });
}

imageRoute = function(data) {
    for (let i = 0; i < data.length; i++) {
        data[i].image = 'http://localhost:3000/api/images/' + data[i].image;
    }

    return data;
}