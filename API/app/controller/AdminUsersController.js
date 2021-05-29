const AdminUsers = require('../model/AdminUsersModel');
const jwt = require('jsonwebtoken');

exports.getAll = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            AdminUsers.getAll((err, users) => {
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

exports.getById = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            AdminUsers.getById(req.params.id, (err, user) => {
                if(err) {
                    res.send(err);
                }
                        
                res.json(user);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}

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
}

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
}

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
}

exports.add = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            let user = new AdminUsers(null, req.body);

            if (!user.email || !user.password || !user.name || !user.surname || !user.gender || !user.address || !user.phone_number) {
                res.send({error: true,  msg: 'No data send'});
            } else if(user.password.length < 8 || user.password > 16) {
                res.send({error: true,  msg: 'Password length doesn\'t in the limit'});
            } else if(!validateEmail(user.email)) {
                res.send({error: true,  message: 'Email format is incorrect'});
            } else {
                AdminUsers.add(user, (err, users) => {
                    if(err) {
                        res.send(err);
                    }

                    if (users.duplicate) {
                        res.send({
                            ok: false,
                            msg: user.msg
                        });
                    } else { 
                        res.json({
                            ok: true, 
                            data: users
                        });
                    }
                });
            }
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}

exports.update = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            let user = new AdminUsers(req.params.id, req.body);

            if (!user.email || !user.password || !user.name || !user.surname || !user.gender || !user.address || !user.phone_number) {
                res.send({error: true,  msg: 'No data send'});
            } else if(user.password.length < 8 || user.password > 16) {
                res.send({error: true,  msg: 'Password length doesn\'t in the limit'});
            } else if(!validateEmail(user.email)) {
                res.send({error: true,  message: 'Email format is incorrect'});
            } else {
                AdminUsers.update(user, (err, users) => {
                    if(err) {
                        res.send(err);
                    }
                    
                    if (users.duplicate) {
                        res.send({
                            ok: false,
                            msg: user.msg
                        });
                    } else { 
                        res.json({
                            ok: true, 
                            data: users
                        });
                    }
                });
            }
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}

function validateEmail(email) {
    let reg = new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");
    return reg.test(email);
}