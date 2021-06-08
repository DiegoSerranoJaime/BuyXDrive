const AdminComments = require('../model/AdminCommentsModel');
const jwt = require('jsonwebtoken');

exports.getAll = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            AdminComments.getAll((err, brands) => {
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

exports.getAllByUser = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            AdminComments.getAllByUser(req.params.id, (err, brands) => {
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
    AdminComments.getById(req.params, (err, brand) => {
        if(err) {
            res.send(err);
        }
                
        res.json(brand);
    });
}