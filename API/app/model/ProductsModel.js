"use strict";

const sql = require('./db');

let Products = function() {}

Products.getAll = function(result) {
    let query = `SELECT 
                    products.id,
                    IF(articles.id, concat(b1.name," ",articles.name), concat(b2.name," ",models.name)) AS name
                FROM products
                LEFT JOIN articles ON products.id = articles.id
                LEFT JOIN article_type ON articles.type = article_type.id
                LEFT JOIN brands AS b1 ON articles.brand = b1.id
                LEFT JOIN vehicles ON products.id = vehicles.id
                LEFT JOIN models ON vehicles.model_id = models.id
                LEFT JOIN brands AS b2 ON models.brand_id = b2.id`;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

Products.getProductCart = function(id, result) {
    let query = `SELECT 
                    IF(articles.id, concat(b1.name," ",articles.name), concat(b2.name," ",models.name)) AS name,
                    price, 
                    discount, 
                    image
                FROM products
                LEFT JOIN articles ON products.id = articles.id
                LEFT JOIN article_type ON articles.type = article_type.id
                LEFT JOIN brands AS b1 ON articles.brand = b1.id
                LEFT JOIN vehicles ON products.id = vehicles.id
                LEFT JOIN models ON vehicles.model_id = models.id
                LEFT JOIN brands AS b2 ON models.brand_id = b2.id
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

module.exports = Products;