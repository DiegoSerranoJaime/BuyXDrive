"use strict";

const sql = require('./db');

let Vehicles = function() {}

Vehicles.getAllVehicles = function(result) {
    
    let query = `SELECT 
                    products.id, 
                    products.price, 
                    products.amount, 
                    products.discount, 
                    images.image, 
                    vehicle_type.name as type, 
                    concat(brands.name," ",models.name) as name,
                    vehicles.doors, 
                    vehicles.seating,
                    vehicles.cv,
                    IF(COUNT(comments.product_id), AVG(comments.valoration), 0) AS val,
                    brands.name AS bname,
                    products.active
                FROM images
                INNER JOIN products ON images.product_id = products.id 
                INNER JOIN vehicles ON products.id = vehicles.id 
                INNER JOIN models ON vehicles.model_id = models.id 
                INNER JOIN brands ON models.brand_id = brands.id 
                INNER JOIN vehicle_type ON vehicles.type = vehicle_type.id 
                LEFT JOIN comments ON comments.product_id = products.id 
                GROUP BY products.id
                HAVING products.active = 1
                ORDER BY products.id DESC`;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

Vehicles.getInitVehicles = function(result) {
    
    let query = `SELECT 
                    products.id, 
                    products.price, 
                    products.amount, 
                    products.discount, 
                    images.image, 
                    vehicle_type.name as type, 
                    concat(brands.name," ",models.name) as name,
                    vehicles.doors, 
                    vehicles.seating,
                    vehicles.cv,
                    IF(COUNT(comments.product_id), AVG(comments.valoration), 0) AS val,
                    products.active
                FROM images
                INNER JOIN products ON images.product_id = products.id 
                INNER JOIN vehicles ON products.id = vehicles.id 
                INNER JOIN models ON vehicles.model_id = models.id 
                INNER JOIN brands ON models.brand_id = brands.id 
                INNER JOIN vehicle_type ON vehicles.type = vehicle_type.id 
                LEFT JOIN comments ON comments.product_id = products.id 
                GROUP BY products.id
                HAVING products.active = 1
                ORDER BY products.id DESC 
                LIMIT 0, 8`;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

Vehicles.getInitVehiclesByType = function(conditions, result) {
    let query = `SELECT 
                    products.id, 
                    products.price, 
                    products.amount, 
                    products.discount, 
                    images.image, 
                    vehicle_type.name as type, 
                    concat(brands.name," ",models.name) as name,
                    vehicles.doors,
                    vehicles.seating, 
                    vehicles.cv,
                    IF(COUNT(comments.product_id), AVG(comments.valoration), 0) AS val,
                    products.active
                FROM images
                INNER JOIN products ON images.product_id = products.id 
                INNER JOIN vehicles ON products.id = vehicles.id 
                INNER JOIN models ON vehicles.model_id = models.id 
                INNER JOIN brands ON models.brand_id = brands.id 
                INNER JOIN vehicle_type ON vehicles.type = vehicle_type.id 
                LEFT JOIN comments ON comments.product_id = products.id 
                GROUP BY products.id 
                HAVING vehicle_type.name = ? AND products.id != ? AND products.active = 1
                ORDER BY products.id, val DESC
                LIMIT 0, 8`;
    
    sql.query(query, [conditions[0], conditions[1]], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

Vehicles.getVehicle = function(id, result) {
    let query = `SELECT 
                    products.id, 
                    products.price, 
                    products.amount, 
                    products.discount, 
                    concat(brands.name," ",models.name) as name, 
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
                    IF(COUNT(comments.product_id), AVG(comments.valoration), 0) AS val,
                    products.active
                FROM products 
                INNER JOIN vehicles ON vehicles.id = products.id 
                INNER JOIN vehicle_type ON vehicles.type = vehicle_type.id 
                INNER JOIN models ON models.id = vehicles.model_id 
                INNER JOIN brands ON models.brand_id = brands.id 
                LEFT JOIN comments ON comments.product_id = products.id 
                GROUP BY products.id 
                HAVING products.id = ? AND products.active = 1`;

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
    concat(brands.name," ",models.name) as name,
                    price, 
                    discount, 
                    image
                FROM products
                INNER JOIN vehicles ON products.id = vehicles.id
                INNER JOIN models ON vehicles.model_id = models.id
                INNER JOIN brands ON models.brand_id = brands.id
                INNER JOIN images ON products.id = images.product_id
                WHERE products.id = ?
                GROUP BY products.id`;

    sql.query(query, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

Vehicles.getVehiclesTypes = function(result) {
    sql.query("SELECT name FROM vehicle_type", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

Vehicles.getVehiclesBrands = function(result) {
    sql.query("SELECT name FROM brands WHERE type = 'Vehiculo'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

Vehicles.getVehiclesMaxPrice = function(result) {
    sql.query("SELECT MAX(price) AS maxPrice FROM products INNER JOIN vehicles USING (id) WHERE active = 1", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

Vehicles.getVehiclesMaxCv = function(result) {
    sql.query("SELECT MAX(cv) AS maxCv FROM products INNER JOIN vehicles USING (id) WHERE active = 1", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

Vehicles.getVehiclesMaxDoors = function(result) {
    sql.query("SELECT MAX(doors) AS maxDoors FROM products INNER JOIN vehicles USING (id) WHERE active = 1", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

Vehicles.getVehiclesMaxSeating = function(result) {
    sql.query("SELECT MAX(seating) AS maxSeating FROM products INNER JOIN vehicles USING (id) WHERE active = 1", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

module.exports = Vehicles;