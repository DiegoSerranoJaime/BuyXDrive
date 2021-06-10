const AdminProvidersProducts = require('../model/AdminProvidersProductsModel');
const jwt = require('jsonwebtoken');

exports.getAll = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.userType == 2) {
            AdminProvidersProducts.getAll(req.params.providerId,(err, providers) => {
                if(err) {
                    res.send(err);
                }
                        
                res.json(providers);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}

exports.delete = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.userType == 2) {
            AdminProvidersProducts.delete(req.params, (err, providers) => {
                if(err) {
                    res.send(err);
                }
                
                res.json(providers);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}

exports.add = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.userType == 2) {
            let product = new AdminProvidersProducts(req.params, req.body);

            AdminProvidersProducts.add(product, (err, products) => {
                if(err) {
                    res.send(err);
                }
                
                if (products && products.duplicate) {
                    res.json({
                        ok: false
                    });
                } else {
                    res.json({
                        ok: true,
                        data: products
                    });
                }

            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}

exports.deliver = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.userType == 2) {
            AdminProvidersProducts.deliver(req.params, (err, products) => {
                if(err) {
                    res.send(err);
                }
                
                res.json({ok: true, data: products});
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}

exports.cancel = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.userType == 2) {
            AdminProvidersProducts.cancel(req.params, (err, products) => {
                if(err) {
                    res.send(err);
                }
                
                res.json({ok: true, data: products});
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}