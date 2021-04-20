"use strict";

const sql = require('./db');

let Vehicles = function() {};

Vehicles.getInitVehicles = function(result) {
    
    let query = `SELECT 
                    products.id, 
                    products.price, 
                    products.amount, 
                    products.discount, 
                    images.image, 
                    vehicle_type.name as type, 
                    brands.name AS bname, 
                    models.name AS mname, 
                    vehicles.doors, 
                    vehicles.seating,
                    vehicles.cv
                FROM images
                INNER JOIN products ON images.product_id = products.id 
                INNER JOIN vehicles ON products.id = vehicles.id 
                INNER JOIN models ON vehicles.model_id = models.id 
                INNER JOIN brands ON models.brand_id = brands.id 
                INNER JOIN vehicle_type ON vehicles.type = vehicle_type.id 
                GROUP BY products.id 
                LIMIT 0, 8`;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
};

Vehicles.getInitVehiclesByType = function(type, result) {
    let query = `SELECT 
                    products.id, 
                    products.price, 
                    products.amount, 
                    products.discount, 
                    images.image, 
                    vehicle_type.name as type, 
                    brands.name AS bname, 
                    models.name AS mname, 
                    vehicles.doors,
                    vehicles.seating, 
                    vehicles.cv
                FROM images
                INNER JOIN products ON images.product_id = products.id 
                INNER JOIN vehicles ON products.id = vehicles.id 
                INNER JOIN models ON vehicles.model_id = models.id 
                INNER JOIN brands ON models.brand_id = brands.id 
                INNER JOIN vehicle_type ON vehicles.type = vehicle_type.id 
                GROUP BY products.id 
                HAVING vehicle_type.name = ?
                LIMIT 0, 8`;
    
    sql.query(query, type, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
};

Vehicles.getVehicle = function(id, result) {
    let query = `SELECT 
                    products.id, 
                    products.price, 
                    products.amount, 
                    products.discount, 
                    brands.name as bname, 
                    models.name as mname, 
                    description, 
                    cv, 
                    traction, 
                    transmission, 
                    status, 
                    km, 
                    fuel, 
                    consumption, 
                    doors, 
                    weight,
                    seating,
                    inner_materials, 
                    vehicle_type.name AS type, 
                    COUNT(comments.product_id) AS cant, 
                    IF(COUNT(comments.product_id), AVG(comments.valoration), 0) AS val 
                FROM products 
                INNER JOIN vehicles ON vehicles.id = products.id 
                INNER JOIN vehicle_type ON vehicles.type = vehicle_type.id 
                INNER JOIN models ON models.id = vehicles.model_id 
                INNER JOIN brands ON models.brand_id = brands.id 
                LEFT JOIN comments ON comments.product_id = products.id 
                GROUP BY products.id 
                HAVING products.id = ?`;

    sql.query(query, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

Vehicles.getVehicleCart = function(id, result) {
    let query = `SELECT 
                    brands.name AS bname, 
                    models.name AS mname, 
                    price, 
                    discount, 
                    image
                FROM products
                INNER JOIN vehicles ON products.id = vehicles.id
                INNER JOIN models ON vehicles.model_id = models.id
                INNER JOIN brands ON models.brand_id = brands.id
                INNER JOIN images ON products.id = images.product_id
                GROUP BY products.id
                WHERE products.id = ?`;

    sql.query(query, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

Vehicles.getVehicleTypes = function(result) {
    sql.query("SELECT * FROM vehicle_type", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
};

module.exports = Vehicles;