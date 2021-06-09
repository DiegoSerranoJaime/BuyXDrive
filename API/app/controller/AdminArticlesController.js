const AdminArticles = require('../model/AdminArticlesModel');
const jwt = require('jsonwebtoken');
const fs = require('fs').promises;

exports.getAllArticles = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.userType == 2) {
            AdminArticles.getAllArticles((err, articles) => {
                if(err) {
                    res.send(err);
                }
                        
                res.json(articles);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}

exports.getById = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.userType == 2) {
            AdminArticles.getById(req.params.id ,(err, article) => {
                if(err) {
                    res.send(err);
                }
                        
                res.json(article);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}


exports.logicDelete = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.userType == 2) {
            AdminArticles.logicDelete(req.params.id, (err, users) => {
                if(err) {
                    res.send(err);
                }
                
                res.json(users);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}

exports.reactive = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.userType == 2) {
            AdminArticles.reactive(req.params.id, (err, users) => {
                if(err) {
                    res.send(err);
                }
                
                res.json(users);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}

exports.delete = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.userType == 2) {
            AdminArticles.getAllImages(req.params.id, (err, images) => {
                let remImages = [];
                images.forEach((image) => {
                    remImages.push(`./assets/images/${image.image}`);
                });

                Promise.all(remImages.map(file => fs.unlink(file)))
                .then(() => { 
                    AdminArticles.delete(req.params.id, (err, articles) => {
                        if(err) {
                            res.send(err);
                        }
                        
                        res.json(articles);
                    });
                });
            });

        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}

exports.add = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.userType == 2) {
            let article = new AdminArticles(req.body);

            AdminArticles.add(article, (err, articles) => {
                if(err) {
                    res.send(err);
                }
                
                res.json({
                    ok: true, 
                    data: articles
                });
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}

exports.update = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.userType == 2) {
            let article = new AdminArticles(req.body);

            AdminArticles.update(article, (err, articles) => {
                if(err) {
                    res.send(err);
                }
                
                res.json({
                    ok: true, 
                    data: articles
                });
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}

exports.getAllTypes = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.userType == 2) {
            AdminArticles.getAllTypes((err, types) => {
                if(err) {
                    res.send(err);
                }
                        
                res.json(types);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}

exports.getAllBrands = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.userType == 2) {
            AdminArticles.getAllBrands((err, brands) => {
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