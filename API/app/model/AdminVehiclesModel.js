"use strict";

const sql = require('./db');

let AdminVehicles = function() {}

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
                INNER JOIN vehicle_type ON vehicles.type = vehicle_type.id 
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