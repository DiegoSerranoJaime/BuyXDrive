const Vehicles = require('../model/AdminVehiclesModel');
const jwt = require('jsonwebtoken');

exports.getAllVehicles = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            Vehicles.getAllVehicles((err, vehicles) => {
                if(err) {
                    res.send(err);
                }
                        
                res.json(vehicles);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
};

imageRoute = function(data) {
    for (let i = 0; i < data.length; i++) {
        data[i].image = 'http://localhost:3000/api/images/' + data[i].image;
    }

    return data;
}