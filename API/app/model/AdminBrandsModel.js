"use strict";

const sql = require('./db');

let AdminBrands = function() {};

AdminBrands.getAll = function(result) {
    
    let query = `SELECT  
                    brands.id,
                    brands.name,
                    brands.type,
                    COUNT(brands.id) AS products
                FROM brands
                LEFT JOIN models ON models.brand_id = brands.id
                LEFT JOIN articles ON articles.brand = brands.id
                GROUP BY brands.id
                ORDER BY type, brands.id ASC`;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
};

AdminBrands.delete = function(id, result) {
    
    let query = `DELETE FROM brands WHERE id = ?`;

    sql.query(query, id ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminBrands.getAll(result);
    });
};

module.exports = AdminBrands;