"use strict";

const sql = require('./db');

let Articles = function() {}

Articles.getAllArticles = function(result) {
    
    let query = `SELECT 
                    products.id, 
                    products.price, 
                    products.amount, 
                    products.discount, 
                    images.image, 
                    article_type.name as type, 
                    concat(brands.name," ",articles.name) as name,
                    articles.name as aname,
                    IF(COUNT(comments.product_id), AVG(comments.valoration), 0) AS val,
                    brands.name AS bname,
                    products.active
                FROM images
                INNER JOIN products ON images.product_id = products.id 
                INNER JOIN articles ON articles.id = products.id
                INNER JOIN brands ON articles.brand = brands.id 
                INNER JOIN article_type ON articles.type = article_type.id 
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

Articles.getInitArticles = function(result) {
    
    let query = `SELECT 
                    products.id, 
                    products.price, 
                    products.amount, 
                    products.discount, 
                    images.image, 
                    article_type.name as type, 
                    concat(brands.name," ",articles.name) as name,
                    articles.name as aname,
                    IF(COUNT(comments.product_id), AVG(comments.valoration), 0) AS val,
                    brands.name AS bname,
                    products.active
                FROM images
                INNER JOIN products ON images.product_id = products.id 
                INNER JOIN articles ON articles.id = products.id
                INNER JOIN brands ON articles.brand = brands.id 
                INNER JOIN article_type ON articles.type = article_type.id 
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

Articles.getInitArticlesByType = function(conditions, result) {
    let query = `SELECT 
                    products.id, 
                    products.price, 
                    products.amount, 
                    products.discount, 
                    images.image, 
                    article_type.name as type, 
                    concat(brands.name," ",articles.name) as name,
                    articles.name as aname,
                    IF(COUNT(comments.product_id), AVG(comments.valoration), 0) AS val,
                    brands.name AS bname,
                    products.active
                FROM images
                INNER JOIN products ON images.product_id = products.id 
                INNER JOIN articles ON articles.id = products.id
                INNER JOIN brands ON articles.brand = brands.id 
                INNER JOIN article_type ON articles.type = article_type.id 
                LEFT JOIN comments ON comments.product_id = products.id 
                GROUP BY products.id
                HAVING article_type.name = ? AND products.id != ? AND products.active = 1
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


Articles.getArticle = function(id, result) {
    let query = `SELECT 
                    products.id, 
                    products.price, 
                    products.amount, 
                    products.discount, 
                    concat(brands.name," ",articles.name) as name, 
                    articles.name as aname, 
                    brands.name as bname, 
                    description, 
                    article_type.name AS type, 
                    COUNT(comments.product_id) AS cant, 
                    IF(COUNT(comments.product_id), AVG(comments.valoration), 0) AS val,
                    products.active
                FROM products 
                INNER JOIN articles ON articles.id = products.id 
                INNER JOIN article_type ON articles.type = article_type.id 
                INNER JOIN brands ON articles.brand = brands.id 
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


Articles.getArticlesTypes = function(result) {
    sql.query("SELECT name FROM article_type", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

Articles.getArticlesBrands = function(result) {
    sql.query("SELECT name FROM brands WHERE type = 'Articulo'", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

Articles.getArticlesMaxPrice = function(result) {
    sql.query("SELECT MAX(price) AS maxPrice FROM products INNER JOIN articles USING (id) WHERE active = 1", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

module.exports = Articles;