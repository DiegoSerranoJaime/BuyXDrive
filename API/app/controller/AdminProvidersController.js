const AdminProviders = require('../model/AdminProvidersModel');
const jwt = require('jsonwebtoken');

exports.getAll = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            AdminProviders.getAll((err, providers) => {
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

exports.getById = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            AdminProviders.getById(req.params.id, (err, providers) => {
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
            AdminProviders.logicDelete(req.params.id, (err, providers) => {
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

exports.reactive = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            AdminProviders.reactive(req.params.id, (err, providers) => {
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

exports.delete = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            AdminProviders.delete(req.params.id, (err, providers) => {
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

exports.add = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            let provider = new AdminProviders(null, req.body);

            AdminProviders.add(provider, (err, providers) => {
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

exports.update = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            let provider = new AdminProviders(req.params.id, req.body);

            AdminProviders.update(provider, (err, providers) => {
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