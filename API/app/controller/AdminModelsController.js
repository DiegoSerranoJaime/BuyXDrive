const AdminModels = require('../model/AdminModelsModel');
const jwt = require('jsonwebtoken');

exports.getAll = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            AdminModels.getAll(req.params.brandId, (err, models) => {
                if(err) {
                    res.send(err);
                }
                        
                res.json(models);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}

exports.getById = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            AdminModels.getById(req.params, (err, models) => {
                if(err) {
                    res.send(err);
                }
                        
                res.json(models);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}

exports.delete = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            AdminModels.delete(req.params, (err, models) => {
                if(err) {
                    res.send(err);
                }
                
                res.json(models);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}

exports.add = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            let model = new AdminModels(req.params, req.body);

            AdminModels.add(model, (err, models) => {
                if(err) {
                    res.send(err);
                }
                
                res.json({
                    ok: true,
                    data: models
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
            let model = new AdminModels(req.params, req.body);

            AdminModels.update(model, (err, models) => {
                if(err) {
                    res.send(err);
                }
                
                res.json({
                    ok: true,
                    data: models
                });
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}