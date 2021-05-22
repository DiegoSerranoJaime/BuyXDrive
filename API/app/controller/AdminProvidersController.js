const Providers = require('../model/AdminProvidersModel');
const jwt = require('jsonwebtoken');

exports.getAllProviders = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            Providers.getAllProviders((err, providers) => {
                if(err) {
                    res.send(err);
                }
                        
                res.json(providers);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
};

exports.logicDelete = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            Providers.logicDelete(req.params.id, (err, users) => {
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
            Providers.reactive(req.params.id, (err, users) => {
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
            Providers.delete(req.params.id, (err, users) => {
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