const AdminBrands = require('../model/AdminBrandsModel');
const jwt = require('jsonwebtoken');

exports.getAll = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            AdminBrands.getAll((err, brands) => {
                if(err) {
                    res.send(err);
                }
                
                res.json(brands);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}

exports.getById = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            AdminBrands.getById(req.params.id, (err, brand) => {
                if(err) {
                    res.send(err);
                }
                        
                res.json(brand);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}


exports.delete = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            AdminBrands.delete(req.params.id, (err, brands) => {
                if(err) {
                    res.send(err);
                }
                
                res.json(brands);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}


exports.add = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            let brand = new AdminBrands(null, req.body);

            AdminBrands.add(brand, (err, brands) => {
                if(err) {
                    res.send(err);
                }
                
                res.json({
                    ok: true, 
                    data: brands
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
            let brand = new AdminBrands(req.params.id, req.body);

            AdminBrands.update(brand, (err, brands) => {
                if(err) {
                    res.send(err);
                }
                
                res.json({
                    ok: true, 
                    data: brands
                });
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}