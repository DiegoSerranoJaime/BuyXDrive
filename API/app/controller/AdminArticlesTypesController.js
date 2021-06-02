const AdminArticlesTypes = require('../model/AdminArticlesTypesModel');
const jwt = require('jsonwebtoken');

exports.getAll = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            AdminArticlesTypes.getAll((err, articlesTypes) => {
                if(err) {
                    res.send(err);
                }
                        
                res.json(articlesTypes);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}

exports.getById = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            AdminArticlesTypes.getById(req.params.id, (err, articlesTypes) => {
                if(err) {
                    res.send(err);
                }
                        
                res.json(articlesTypes);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}

exports.delete = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            AdminArticlesTypes.delete(req.params.id, (err, articlesTypes) => {
                if(err) {
                    res.send(err);
                }
                
                res.json(articlesTypes);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}


exports.add = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            let articleType = new AdminArticlesTypes(null, req.body);

            AdminArticlesTypes.add(articleType, (err, articlesTypes) => {
                if(err) {
                    res.send(err);
                }
                
                res.json({
                    ok: true,
                    data: articlesTypes
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
            let articleType = new AdminArticlesTypes(req.params.id, req.body);

            AdminArticlesTypes.update(articleType, (err, articlesTypes) => {
                if(err) {
                    res.send(err);
                }
                
                res.json({
                    ok: true,
                    data: articlesTypes
                });
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}