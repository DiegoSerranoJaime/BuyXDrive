const AdminComments = require('../model/AdminCommentsModel');
const jwt = require('jsonwebtoken');

exports.getAll = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.userType == 2) {
            AdminComments.getAll((err, comments) => {
                if(err) {
                    res.send(err);
                }
                
                res.json(comments);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}

exports.getAllByUser = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.userType == 2) {
            AdminComments.getAllByUser(req.params.id, (err, comments) => {
                if(err) {
                    res.send(err);
                }
                
                res.json(comments);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}

exports.getById = function(req, res) {
    AdminComments.getById(req.params, (err, comment) => {
        if(err) {
            res.send(err);
        }
                
        res.json(comment);
    });
}


exports.deleteAndGetAll = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.userType == 2) {
            AdminComments.deleteAndGetAll(req.params, (err, comments) => {
                if(err) {
                    res.send(err);
                }
                        
                res.json(comments);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}

exports.deleteAndGetAllByUser = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.userType == 2) {
            AdminComments.deleteAndGetAllByUser(req.params, (err, comments) => {
                if(err) {
                    res.send(err);
                }
                        
                res.json(comments);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}