const Vehicles = require('../model/VehiclesModel');

exports.getInitVehicles = function(req, res) {
    Vehicles.getInitVehicles((err, vehicles) => {
        if(err) {
            res.send(err);
        }
        
        res.json(vehicles);
    });
};

exports.getInitVehiclesByType = function(req, res) {
    Vehicles.getInitVehiclesByType(req.params.type, (err, vehicles) => {
        if(err) {
            res.send(err);
        }
        
        res.json(vehicles);
    });
};

exports.getVehicle = function(req, res) {
    Vehicles.getVehicle(req.params.id, (err, vehicle) => {
        if(err) {
            res.send(err);
        }
        
        res.json(vehicle);
    });
};

exports.getVehicleCart = function(req, res) {
    Vehicles.getVehicle(req.params.id, (err, vehicle) => {
        if(err) {
            res.send(err);
        }
        
        res.json(vehicle);
    });
};

exports.getVehicleTypes = function(req, res) {
    Vehicles.getVehicleTypes((err, vehicles) => {
        if(err) {
            res.send(err);
        }
        
        res.json(vehicles);
    });
};