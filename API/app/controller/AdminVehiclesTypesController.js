const AdminVehiclesTypes = require('../model/AdminVehiclesTypesModel');
const jwt = require('jsonwebtoken');

exports.getAll = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.userType == 2) {
            AdminVehiclesTypes.getAll((err, vehiclesTypes) => {
                if(err) {
                    res.send(err);
                }
                        
                res.json(vehiclesTypes);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}

exports.getById = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.userType == 2) {
            AdminVehiclesTypes.getById(req.params.id, (err, vehiclesTypes) => {
                if(err) {
                    res.send(err);
                }
                        
                res.json(vehiclesTypes);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}

exports.delete = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.userType == 2) {
            AdminVehiclesTypes.delete(req.params.id, (err, vehiclesTypes) => {
                if(err) {
                    res.send(err);
                }
                
                res.json(vehiclesTypes);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}


exports.add = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.userType == 2) {
            let vehicleType = new AdminVehiclesTypes(null, req.body);

            AdminVehiclesTypes.add(vehicleType, (err, vehiclesTypes) => {
                if(err) {
                    res.send(err);
                }
                
                res.json({
                    ok: true,
                    data: vehiclesTypes
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
            let vehicleType = new AdminVehiclesTypes(req.params.id, req.body);

            AdminVehiclesTypes.update(vehicleType, (err, vehiclesTypes) => {
                if(err) {
                    res.send(err);
                }
                
                res.json({
                    ok: true,
                    data: vehiclesTypes
                });
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}