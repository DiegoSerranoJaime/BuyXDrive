const Vehicles = require('../model/VehiclesModel');

exports.getInitVehicles = function(req, res) {
    Vehicles.getInitVehicles((err, vehicles) => {
        if(err) {
            res.send(err);
        }

        vehicles = imageRoute(vehicles);
        
        res.json(vehicles);
    });
};

exports.getInitVehiclesByType = function(req, res) {
    Vehicles.getInitVehiclesByType([req.params.type, req.params.id], (err, vehicles) => {
        if(err) {
            res.send(err);
        }

        vehicles = imageRoute(vehicles);
        
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
    Vehicles.getVehicleCart(req.params.id, (err, vehicles) => {
        if(err) {
            res.send(err);
        }
        
        vehicles = imageRoute(vehicles);

        res.json(vehicles);
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

imageRoute = function(data) {
    for (let i = 0; i < data.length; i++) {
        data[i].image = 'http://localhost:3000/api/images/' + data[i].image;
    }

    return data;
}