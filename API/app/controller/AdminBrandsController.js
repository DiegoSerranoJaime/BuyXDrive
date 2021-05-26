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
};

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
};