"use strict";

const sql = require('./db');

let AdminComments = function() {}

AdminComments.getAll = function(result) {
    
    let query = `SELECT 
                    email, 
                    title, 
                    body, 
                    valoration, 
                    publication_date,
                    IF(articles.id, concat(b2.name," ",articles.name), concat(b1.name," ",models.name)) AS name,
                    product_id,
                    user_id
                FROM comments
                INNER JOIN users ON users.id = comments.user_id
                INNER JOIN products ON products.id = comments.product_id
                LEFT JOIN vehicles ON vehicles.id = products.id
                LEFT JOIN models ON models.id = vehicles.model_id
                LEFT JOIN brands AS b1 ON b1.id = models.brand_id
                LEFT JOIN articles ON articles.id = products.id
                LEFT JOIN brands AS b2 ON b2.id = articles.brand
                ORDER BY publication_date DESC`;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

AdminComments.getAllByUser = function(id, result) {
    
    let query = `SELECT 
                    email, 
                    title, 
                    body, 
                    valoration, 
                    publication_date,
                    IF(articles.id, concat(b2.name," ",articles.name), concat(b1.name," ",models.name)) AS name,
                    product_id AS id
                FROM comments
                INNER JOIN users ON users.id = comments.user_id
                INNER JOIN products ON products.id = comments.product_id
                LEFT JOIN vehicles ON vehicles.id = products.id
                LEFT JOIN models ON models.id = vehicles.model_id
                LEFT JOIN brands AS b1 ON b1.id = models.brand_id
                LEFT JOIN articles ON articles.id = products.id
                LEFT JOIN brands AS b2 ON b2.id = articles.brand
                WHERE user_id = ?
                ORDER BY publication_date DESC
                `;

    sql.query(query, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}


AdminComments.getById = function(id, result) {
    
    let query = `SELECT 
                    email, 
                    title, 
                    body, 
                    valoration, 
                    publication_date
                FROM comments
                INNER JOIN users ON users.id = comments.user_id
                WHERE product_id = ? AND user_id = ?
                ORDER BY publication_date DESC`;

    sql.query(query, [id.productId, id.userId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

module.exports = AdminComments;