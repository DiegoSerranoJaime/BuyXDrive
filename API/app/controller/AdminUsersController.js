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

exports.getAllEmployers = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            AdminUsers.getAllEmployers((err, users) => {
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