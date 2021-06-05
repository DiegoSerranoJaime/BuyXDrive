"use strict";

const sql = require('./db');

let AdminBrands = function(id, brand) {
    this.id = id >= 0 ? id : null;
    this.name = brand.name;
    this.type = brand.type;
}

AdminBrands.getAll = function(result) {
    
    let query = `SELECT  
                    brands.id,
                    brands.name,
                    brands.type,
                    IF((COUNT(articles.brand) + COUNT(vehicles.model_id) > 0), (COUNT(articles.brand) + COUNT(vehicles.model_id)), 0) AS products
                FROM brands
                LEFT JOIN models ON models.brand_id = brands.id
                LEFT JOIN articles ON articles.brand = brands.id
                LEFT JOIN vehicles ON vehicles.model_id = models.id
                GROUP BY brands.id
                ORDER BY type, brands.id ASC`;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}


AdminBrands.getById = function(id, result) {
    
    let query = `SELECT brands.id, brands.name, brands.type FROM brands WHERE id = ?`;

    sql.query(query, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

AdminBrands.delete = function(id, result) {
    
    let query = `DELETE FROM brands WHERE id = ?`;

    sql.query(query, id ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminBrands.getAll(result);
    });
}

AdminBrands.add = function(provider, result) {
    
    let query = `INSERT INTO brands SET ?`;

    sql.query(query, provider ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminBrands.getAll(result);
    });
}

AdminBrands.update = function(brand, result) {
    
    let query = `UPDATE brands SET name = ?, type = ? WHERE id = ?`;

    sql.query(query, [brand.name, brand.type, brand.id] ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminBrands.getAll(result);
    });
}


module.exports = AdminBrands;