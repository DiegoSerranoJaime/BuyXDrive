const Users = require('../model/UsersModel');
const jwt = require('jsonwebtoken')

exports.login = function(req, res) {
    if (!req.body.email || !req.body.password) {
        res.sendStatus(400).send({error: true,  message: 'No data send'});
    } else {
        Users.login(req.body, (err, user) => {    
            if(err) {
                res.send(err);
            }

            if(user.length > 0) {
    
                const trueUser = {
                    id: user[0].id,
                    name: user[0].name,
                    surname: user[0].surname,
                    email: user[0].email,
                    gender: user[0].gender,
                    address: user[0].address,
                    phoneNumber: user[0].phone_number,
                    userType: user[0].user_type,
                };
    
                jwt.sign({user: trueUser}, 'secretkey', { expiresIn: '1w' }, (err, token) => {
                    res.json({
                        ok: true,
                        token
                    });
                });
            } else {
                res.send({ok: false, msg: 'No se ha podido iniciar sesión'});
            }
        });
    }

}

exports.register = function(req, res) {
    let user = new Users(req.body);

    if (!user.email || !user.password || !user.name || !user.surname || !user.gender || !user.address || !user.phone_number) {
        res.send({ok: false,  msg: 'No data send'});
    } else if(user.password.length < 8 || user.password > 16) {
        res.send({ok: false,  msg: 'Password length doesn\'t in the limit'});
    } else if(req.body.passwords.password != req.body.passwords.passwordConfirmation) {
        res.send({ok: false,  msg: 'Las contraseñas no coinciden'});
    } else if(!validateEmail(user.email)) {
        res.send({ok: false,  msg: 'Email format is incorrect'});
    } else {
        Users.register(user, (err, user) => {    
            if(err) {
                res.send(err);
            }

            if (user.duplicate) {
                res.send({
                    ok: false,
                    msg: user.msg
                });
            } else {
                res.send({
                    ok: true,
                    msg: 'Usuario registrado'
                });
            }
        });
    }
}

exports.getAllGenders = function(req, res) {
    Users.getAllGenders((err, genders) => {
        if (err) {
            res.send(err);
        }

        res.send(genders);
    });
}

exports.getGenderById = function(req, res) {
    Users.getGenderById(req.params.id, (err, gender) => {
        if (err) {
            res.send(err);
        }
        
        res.send(gender);
    });
}


exports.getAllEmployerTypes = function(req, res) {
    Users.getAllEmployerTypes((err, userTypes) => {
        if (err) {
            res.send(err);
        }

        res.send(userTypes);
    });
}

exports.updateName = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {

        if (err) {
            res.sendStatus(403);
        } else {
            let user = req.body;
            user.id = authData.user.id;
        
            if (!user.name || !user.surname) {
                res.send({ok: false,  msg: 'No data send'});
            } else {
                Users.updateName(user, (err, data) => {    
                    if (err) {
                        res.send(err);
                    }

                    if (data) {
                        const trueUser = {
                            id: authData.user.id,
                            name: user.name,
                            surname: user.surname,
                            email: authData.user.email,
                            gender: authData.user.gender,
                            address: authData.user.address,
                            phoneNumber: authData.user.phoneNumber,
                            userType: authData.user.userType,
                        };
            
                        jwt.sign({user: trueUser}, 'secretkey', { expiresIn: '1w' }, (err, token) => {
                            res.json({
                                ok: true,
                                token
                            });
                        });
                    } else {
                        res.send({
                            ok: false
                        });
                    }
                });
            }
        }
    });
}

exports.updateEmail = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {

        if (err) {
            res.sendStatus(403);
        } else {
            let user = req.body;
            user.id = authData.user.id;
        
            if (!user.email) {
                res.send({ok: false,  msg: 'No data send'});
            } else if (!validateEmail(user.email)) {
                res.send({ok: false,  msg: 'Email format is incorrect'});
            } else {
                Users.updateEmail(user, (err, data) => {    
                    if (err) {
                        res.send(err);
                    }

                    if (data) {
                        const trueUser = {
                            id: authData.user.id,
                            name: authData.user.name,
                            surname: authData.user.surname,
                            email: user.email,
                            gender: authData.user.gender,
                            address: authData.user.address,
                            phoneNumber: authData.user.phoneNumber,
                            userType: authData.user.userType,
                        };
            
                        jwt.sign({user: trueUser}, 'secretkey', { expiresIn: '1w' }, (err, token) => {
                            res.json({
                                ok: true,
                                token
                            });
                        });
                    } else {
                        res.send({
                            ok: false
                        });
                    }
                });
            }
        }
    });
}

exports.updatePassword = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {

        if (err) {
            res.sendStatus(403);
        } else {
            let user = req.body;
            user.id = authData.user.id;
        
            if (!user.password || !user.passwordConfirmation) {
                res.send({ok: false,  msg: 'No data send'});
            } else if(user.password != user.passwordConfirmation) {
                res.send({ok: false,  msg: 'Las contraseñas no coinciden'});
            } else {
                Users.updatePassword(user, (err, data) => {    
                    if (err) {
                        res.send(err);
                    }

                    if (data) {
                        const trueUser = {
                            id: authData.user.id,
                            name: authData.user.name,
                            surname: authData.user.surname,
                            email: authData.user.email,
                            gender: authData.user.gender,
                            address: authData.user.address,
                            phoneNumber: authData.user.phoneNumber,
                            userType: authData.user.userType,
                        };
            
                        jwt.sign({user: trueUser}, 'secretkey', { expiresIn: '1w' }, (err, token) => {
                            res.json({
                                ok: true,
                                token
                            });
                        });
                    } else {
                        res.send({
                            ok: false
                        });
                    }
                });
            }
        }
    });
}

exports.updateGender = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {

        if (err) {
            res.sendStatus(403);
        } else {
            let user = req.body;
            user.id = authData.user.id;
        
            if (!user.gender) {
                res.send({ok: false,  msg: 'No data send'});
            } else {
                Users.updateGender(user, (err, data) => {    
                    if (err) {
                        res.send(err);
                    }
        
                    if (data) {
                        const trueUser = {
                            id: authData.user.id,
                            name: authData.user.name,
                            surname: authData.user.surname,
                            email: authData.user.email,
                            gender: user.gender,
                            address: authData.user.address,
                            phoneNumber: authData.user.phoneNumber,
                            userType: authData.user.userType,
                        };
            
                        jwt.sign({user: trueUser}, 'secretkey', { expiresIn: '1w' }, (err, token) => {
                            res.json({
                                ok: true,
                                token
                            });
                        });
                    } else {
                        res.send({
                            ok: false
                        });
                    }
                });
            }
        }
    });
}

exports.updateAddress = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {

        if (err) {
            res.sendStatus(403);
        } else {
            let user = req.body;
            user.id = authData.user.id;
        
            if (!user.address) {
                res.send({ok: false,  msg: 'No data send'});
            } else {
                Users.updateAddress(user, (err, data) => {    
                    if (err) {
                        res.send(err);
                    }
        
                    if (data) {
                        const trueUser = {
                            id: authData.user.id,
                            name: authData.user.name,
                            surname: authData.user.surname,
                            email: authData.user.email,
                            gender: authData.user.gender,
                            address: user.address,
                            phoneNumber: authData.user.phoneNumber,
                            userType: authData.user.userType,
                        };
            
                        jwt.sign({user: trueUser}, 'secretkey', { expiresIn: '1w' }, (err, token) => {
                            res.json({
                                ok: true,
                                token
                            });
                        });
                    } else {
                        res.send({
                            ok: false
                        });
                    }
                });
            }
        }
    });
}

exports.updatePhoneNumber = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {

        if (err) {
            res.sendStatus(403);
        } else {
            let user = req.body;
            user.id = authData.user.id;
        
            if (!user.phoneNumber) {
                res.send({ok: false,  msg: 'No data send'});
            } else {
                Users.updatePhoneNumber(user, (err, data) => {    
                    if(err) {
                        res.send(err);
                    }
        
                    if (data) {
                        const trueUser = {
                            id: authData.user.id,
                            name: authData.user.name,
                            surname: authData.user.surname,
                            email: authData.user.email,
                            gender: authData.user.gender,
                            address: authData.user.address,
                            phoneNumber: user.phoneNumber,
                            userType: authData.user.userType,
                        };
            
                        jwt.sign({user: trueUser}, 'secretkey', { expiresIn: '1w' }, (err, token) => {
                            res.json({
                                ok: true,
                                token
                            });
                        });
                    } else {
                        res.send({
                            ok: false
                        });
                    }
                });
            }
        }
    });
}

exports.logicDelete = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {

        if (err) {
            res.sendStatus(403);
        } else {
            Users.logicDelete(authData.user.id, (err, user) => {    
                if (err) {
                    res.send(err);
                }
    
                if (user) {
                    res.send({
                        ok: true,
                        msg: 'Cuenta desactivada'
                    });
                } else {
                    res.send({
                        ok: false,
                        msg: 'No se ha podido desactivar la cuenta'
                    });
                }
            });
        }
    });
}

exports.emailValidation = function(req, res) {
    Users.emailValidation(req.params.email, (err, email) => {
        if (err) {
            res.send(err);
        }
        
        if (email.length) {
            res.send({
                ok: true
            });
        } else {
            res.send({
                ok: false
            });
        }
    });
}

function validateEmail(email) {
    let reg = new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");
    return reg.test(email);
}
