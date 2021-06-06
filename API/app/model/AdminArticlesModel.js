"use strict";

const sql = require('./db');

let AdminArticles = function(article) {
    this.id = article.id;
    if (article.name) {
        this.name = article.name;
    }
    this.type = article.type;
    this.brand = article.brand;
}

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
}

AdminArticles.getById = function(id, result) {
    
    let query = `SELECT 
                    name,
                    brand,
                    type, 
                    products.price, 
                    products.amount, 
                    products.discount, 
                    products.description
                FROM products
                INNER JOIN articles ON articles.id = products.id
                WHERE products.id = ?`;

    sql.query(query, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

AdminArticles.logicDelete = function(id, result) {
    
    let query = `UPDATE products SET active = 0 WHERE id = ?`;

    sql.query(query, id ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminArticles.getAllArticles(result);
    });
}

AdminArticles.add = function(article, result) {
    
    let query = `INSERT INTO articles SET ?`;

    sql.query(query, article, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminArticles.getAllArticles(result);
    });
}

AdminArticles.update = function(article, result) {
    
    let query = `UPDATE articles SET ? WHERE id = ?`;

    sql.query(query, [article, article.id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminArticles.getAllArticles(result);
    });
}

AdminArticles.reactive = function(id, result) {
    
    let query = `UPDATE products SET active = 1 WHERE id = ?`;

    sql.query(query, id ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminArticles.getAllArticles(result);
    });
}

AdminArticles.delete = function(id, result) {
    
    let query = `DELETE FROM products WHERE id = ?`;

    sql.query(query, id ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminArticles.getAllArticles(result);
    });
}

AdminArticles.getAllBrands = function(result) {
    
    let query = `SELECT 
                    id,
                    name
                FROM brands
                WHERE type = 'Articulo'`;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

AdminArticles.getAllTypes = function(result) {
    
    let query = `SELECT 
                    *
                FROM article_type`;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

AdminArticles.getAllImages = function(id, result) {
    
    let query = `SELECT 
                    *
                FROM images
                WHERE product_id = ?`;

    sql.query(query, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

module.exports = AdminArticles;