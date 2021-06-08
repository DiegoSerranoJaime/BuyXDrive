"use strict";

const sql = require('./db');

let AdminOrderProducts = function() {}

AdminOrderProducts.getAll = function(id, result) {
    let query = `SELECT
                    products.id,
                    IF(articles.id, concat(b1.name," ",articles.name), concat(b2.name," ",models.name)) AS name, 
                    orders_products.amount,
                    orders_products.price, 
                    orders_products.discount
                FROM orders_products
                INNER JOIN orders ON orders.id = orders_products.order_id
                INNER JOIN products ON products.id = orders_products.product_id
                LEFT JOIN articles ON products.id = articles.id
                LEFT JOIN article_type ON articles.type = article_type.id
                LEFT JOIN brands AS b1 ON articles.brand = b1.id
                LEFT JOIN vehicles ON products.id = vehicles.id
                LEFT JOIN models ON vehicles.model_id = models.id
                LEFT JOIN brands AS b2 ON models.brand_id = b2.id
                WHERE order_id LIKE ?`;

    sql.query(query, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

module.exports = AdminOrderProducts;