"use strict";

const sql = require('./db');

let AdminVehiclesTypes = function(id, vehicleType) {
    this.id = id >= 0 ? id : null;
    this.name = vehicleType.name;
}

AdminVehiclesTypes.getAll = function(result) {
    
    let query = `SELECT  
                    vehicle_type.id,
                    name,
                    IF(COUNT(vehicles.type), COUNT(vehicles.type), 0) AS vehicles
                FROM vehicle_type
                LEFT JOIN vehicles ON vehicle_type.id = vehicles.type
                GROUP BY vehicle_type.id`;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

AdminVehiclesTypes.getById = function(id, result) {
    
    let query = `SELECT  
                    name
                FROM vehicle_type
                WHERE id = ?`;

    sql.query(query, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

AdminVehiclesTypes.delete = function(id, result) {
    
    let query = `DELETE FROM vehicle_type WHERE id = ?`;

    sql.query(query, id ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminVehiclesTypes.getAll(result);
    });
}

AdminVehiclesTypes.add = function(vehicleType, result) {
    let query = `INSERT INTO vehicle_type SET ?`;
    
    sql.query(query, vehicleType, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminVehiclesTypes.getAll(result);
    });
}

AdminVehiclesTypes.update = function(vehicleType, result) {
    let query = `UPDATE vehicle_type SET ? WHERE id = ?`;

    sql.query(query, [vehicleType, vehicleType.id] ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminVehiclesTypes.getAll(result);
    });

}

module.exports = AdminVehiclesTypes;