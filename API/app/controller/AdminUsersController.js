const AdminUsers = require('../model/AdminUsersModel');
const jwt = require('jsonwebtoken');

exports.getAllUsers = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            AdminUsers.getAllUsers((err, users) => {
                if(err) {
                    res.send(err);
                }
                
                res.json(users);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
};

exports.logicDelete = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            AdminUsers.logicDelete(req.params.id, (err, users) => {
                if(err) {
                    res.send(err);
                }
                
                res.json(users);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
};

exports.reactive = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            AdminUsers.reactive(req.params.id, (err, users) => {
                if(err) {
                    res.send(err);
                }
                
                res.json(users);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
};

exports.delete = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            AdminUsers.delete(req.params.id, (err, users) => {
                if(err) {
                    res.send(err);
                }
                
                res.json(users);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
};