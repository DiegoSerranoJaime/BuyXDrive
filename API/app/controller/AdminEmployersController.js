const AdminEmployers = require('../model/AdminEmployersModel');
const jwt = require('jsonwebtoken');

exports.getAll = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            AdminEmployers.getAll((err, users) => {
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
            AdminEmployers.getById(req.params.id, (err, user) => {
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
            AdminEmployers.logicDelete(req.params.id, (err, users) => {
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
            AdminEmployers.reactive(req.params.id, (err, users) => {
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
            AdminEmployers.delete(req.params.id, (err, users) => {
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
            let user = new AdminEmployers(null, req.body);
            
            if (!user.email || !user.password || !user.name || !user.surname || !user.gender || !user.address || !user.phone_number) {
                res.send({ok: false,  msg: 'No data send'});
            } else if(user.password.length < 8 || user.password > 16) {
                res.send({ok: false,  msg: 'Password length doesn\'t in the limit'});
            } else if(!validateEmail(user.email)) {
                res.send({ok: false,  msg: 'Email format is incorrect'});
            } else if(user.user_type < 2) {
                res.send({ok: false,  msg: 'User type is incorrect'});
            } else {
                AdminEmployers.add(user, (err, users) => {
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
            let user = new AdminEmployers(req.params.id, req.body);

            if (!user.email || !user.password || !user.name || !user.surname || !user.gender || !user.address || !user.phone_number) {
                res.send({ok: false,  msg: 'No data send'});
            } else if(user.password.length < 8 || user.password > 16) {
                res.send({ok: false,  msg: 'Password length doesn\'t in the limit'});
            } else if(!validateEmail(user.email)) {
                res.send({ok: false,  msg: 'Email format is incorrect'});
            } else if(user.user_type < 2) {
                res.send({ok: false,  msg: 'User type is incorrect'});
            } else {
                AdminEmployers.update(user, (err, users) => {
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