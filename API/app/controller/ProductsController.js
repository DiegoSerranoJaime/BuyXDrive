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

exports.add = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            let product = new Products(null, req.body);

            Products.add(product, (err, product) => {
                if(err) {
                    res.send(err);
                }
                
                res.json({
                    ok: true, 
                    data: product
                });
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}

exports.update = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            let product = new Products(req.params.id, req.body);

            Products.update(product, (err, product) => {
                if(err) {
                    res.send(err);
                }
                
                res.json({
                    ok: true, 
                    data: product
                });
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}

exports.amountValidation = function(req, res) {
    Products.amountValidation(req.params, (err, product) => {
        if(err) {
            res.send(err);
        }
                
        if (product.length) {
            res.send({ok: false});
        } else {
            res.send({ok: true});
        }
    });
}

imageRoute = function(data) {
    for (let i = 0; i < data.length; i++) {
        data[i].image = 'http://localhost:3000/api/images/' + data[i].image;
    }

    return data;
}