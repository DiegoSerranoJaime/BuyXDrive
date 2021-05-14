const Vehicles = require('../model/VehiclesModel');

exports.getAllVehicles = function(req, res) {
    Vehicles.getAllVehicles((err, vehicles) => {
        if(err) {
            res.send(err);
        }

        vehicles = imageRoute(vehicles);
        
        res.json(vehicles);
    });
};

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

exports.getVehiclesTypes = function(req, res) {
    Vehicles.getVehiclesTypes((err, types) => {
        if(err) {
            res.send(err);
        }
        
        res.json(types);
    });
};

exports.getVehiclesBrands = function(req, res) {
    Vehicles.getVehiclesBrands((err, brands) => {
        if(err) {
            res.send(err);
        }
        
        res.json(brands);
    });
};

imageRoute = function(data) {
    for (let i = 0; i < data.length; i++) {
        data[i].image = 'http://localhost:3000/api/images/' + data[i].image;
    }

    return data;
}