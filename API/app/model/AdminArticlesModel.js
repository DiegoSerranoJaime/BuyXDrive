"use strict";

const sql = require('./db');

let AdminArticles = function() {};

AdminArticles.getAllArticles = function(result) {
    
    let query = `SELECT 
                    products.id, 
                    products.price, 
                    products.amount, 
                    products.discount, 
                    article_type.name as type, 
                    IF(COUNT(comments.product_id), AVG(comments.valoration), 0) AS val,
                    brands.name AS bname,
                    articles.name as aname,
                    products.active
                FROM products
                INNER JOIN articles ON articles.id = products.id
                INNER JOIN brands ON articles.brand = brands.id 
                INNER JOIN article_type ON articles.type = article_type.id 
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
};

AdminArticles.logicDelete = function(id, result) {
    
    let query = `UPDATE products SET active = 0 WHERE id = ?`;

    sql.query(query, id ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
};

AdminArticles.reactive = function(id, result) {
    
    let query = `UPDATE products SET active = 1 WHERE id = ?`;

    sql.query(query, id ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
};

AdminArticles.delete = function(id, result) {
    
    let query = `DELETE FROM products WHERE id = ?`;

    sql.query(query, id ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminArticles.getAllArticles(result);
    });
};


module.exports = AdminArticles;