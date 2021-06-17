"use strict";

const sql = require('./db');

let AdminVehicles = function(vehicle) {
    this.id = vehicle.id;
    if (vehicle.modelId) {
        this.model_id = vehicle.modelId;
    }
    this.type = vehicle.type;
    this.cv = vehicle.cv;
    this.traction = vehicle.traction;
    this.transmission = vehicle.transmission;
    this.status = vehicle.km > 0 ? 'Seminuevo' : 'Nuevo';
    this.km = vehicle.km;
    this.fuel = vehicle.fuel;
    this.consumption = vehicle.consumption;
    this.doors = vehicle.doors;
    this.weight = vehicle.weight;
    this.seating = vehicle.seating;
    this.inner_materials = vehicle.innerMaterials;
}

AdminVehicles.getAllVehicles = function(result) {
    
    let query = `SELECT 
                    products.id, 
                    products.price, 
                    products.amount, 
                    products.discount, 
                    vehicle_type.name as type, 
                    IF(COUNT(comments.product_id), AVG(comments.valoration), 0) AS val,
                    brands.name AS bname,
                    models.name AS mname,
                    products.active
                FROM products
                INNER JOIN vehicles ON products.id = vehicles.id 
                INNER JOIN models ON vehicles.model_id = models.id 
                INNER JOIN brands ON models.brand_id = brands.id 
                LEFT JOIN vehicle_type ON vehicles.type = vehicle_type.id 
                LEFT JOIN comments ON comments.product_id = products.id
                GROUP BY products.id
                ORDER BY products.active DESC, products.id ASC`;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

AdminVehicles.getById = function(id, result) {
    
    let query = `SELECT 
                    products.price, 
                    products.amount, 
                    products.discount, 
                    model_id,
                    type, 
                    cv,
                    traction,
                    transmission,
                    km,
                    fuel,
                    consumption,
                    doors,
                    weight,
                    seating,
                    inner_materials,
                    description
                FROM products
                INNER JOIN vehicles ON products.id = vehicles.id 
                WHERE products.id = ?`;

    sql.query(query, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

AdminVehicles.logicDelete = function(id, result) {
    
    let query = `UPDATE products SET active = 0 WHERE id = ?`;

    sql.query(query, id ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminVehicles.getAllVehicles(result);
    });
}

AdminVehicles.reactive = function(id, result) {
    
    let query = `UPDATE products SET active = 1 WHERE id = ?`;

    sql.query(query, id ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminVehicles.getAllVehicles(result);
    });
}

AdminVehicles.delete = function(id, result) {
    
    let query = `DELETE FROM products WHERE id = ?`;

    sql.query(query, id ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminVehicles.getAllVehicles(result);
    });
}

AdminVehicles.add = function(vehicle, result) {
    
    let query = `INSERT INTO vehicles SET ?`;

    sql.query(query, vehicle ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminVehicles.getAllVehicles(result);
    });
}

AdminVehicles.update = function(vehicle, result) {
    
    let query = `UPDATE vehicles SET ? WHERE id = ?`;

    sql.query(query, [vehicle, vehicle.id] ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminVehicles.getAllVehicles(result);
    });
}

AdminVehicles.getAllModels = function(result) {
    
    let query = `SELECT
                    models.id,
                    concat(brands.name, ' ', models.name) as name
                FROM brands
                INNER JOIN models ON models.brand_id = brands.id`;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

AdminVehicles.getAllTypes = function(result) {
    
    let query = `SELECT
                    *
                FROM vehicle_type`;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

module.exports = AdminVehicles;