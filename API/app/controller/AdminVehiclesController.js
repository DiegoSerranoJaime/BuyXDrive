const AdminVehicles = require('../model/AdminVehiclesModel');
const jwt = require('jsonwebtoken');
const fs = require('fs').promises;

exports.getAllVehicles = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            AdminVehicles.getAllVehicles((err, vehicles) => {
                if(err) {
                    res.send(err);
                }
                        
                res.json(vehicles);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}

exports.getById = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            AdminVehicles.getById(req.params.id, (err, vehicle) => {
                if(err) {
                    res.send(err);
                }
                        
                res.json(vehicle);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}

exports.add = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            let vehicle = new AdminVehicles(req.body);

            AdminVehicles.add(vehicle, (err, vehicles) => {
                if(err) {
                    res.send(err);
                }
                
                res.json({
                    ok: true, 
                    data: vehicles
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
            let vehicle = new AdminVehicles(req.body);

            AdminVehicles.update(vehicle, (err, vehicles) => {
                if(err) {
                    res.send(err);
                }
                
                res.json({
                    ok: true, 
                    data: vehicles
                });
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}

exports.logicDelete = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            AdminVehicles.logicDelete(req.params.id, (err, users) => {
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
            AdminVehicles.reactive(req.params.id, (err, users) => {
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
            let remImages = [];
            images.forEach((image) => {
                remImages.push(`./assets/images/${image.image}`);
            });

            Promise.all(remImages.map(file => fs.unlink(file)))
            .then(() => { 
                AdminVehicles.delete(req.params.id, (err, vehicles) => {
                    if(err) {
                        res.send(err);
                    }
                    
                    res.json(vehicles);
                });
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}

exports.getAllModels = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            AdminVehicles.getAllModels((err, models) => {
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

exports.getAllTypes = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            AdminVehicles.getAllTypes((err, types) => {
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