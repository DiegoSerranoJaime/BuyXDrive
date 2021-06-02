"use strict";

const sql = require('./db');

let AdminArticlesTypes = function(id, articleType) {
    this.id = id >= 0 ? id : null;
    this.name = articleType.name;
}

AdminArticlesTypes.getAll = function(result) {
    
    let query = `SELECT  
                    article_type.id,
                    article_type.name,
                    IF(COUNT(articles.type), COUNT(articles.type), 0) AS articles
                FROM article_type
                LEFT JOIN articles ON article_type.id = articles.type
                GROUP BY article_type.id`;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

AdminArticlesTypes.getById = function(id, result) {
    
    let query = `SELECT  
                    name
                FROM article_type
                WHERE id = ?`;

    sql.query(query, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

AdminArticlesTypes.delete = function(id, result) {
    
    let query = `DELETE FROM article_type WHERE id = ?`;

    sql.query(query, id ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminArticlesTypes.getAll(result);
    });
}

AdminArticlesTypes.add = function(articleType, result) {
    let query = `INSERT INTO article_type SET ?`;
    
    sql.query(query, articleType, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminArticlesTypes.getAll(result);
    });
}

AdminArticlesTypes.update = function(articleType, result) {
    let query = `UPDATE article_type SET ? WHERE id = ?`;

    sql.query(query, [articleType, articleType.id] ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminArticlesTypes.getAll(result);
    });

}

module.exports = AdminArticlesTypes;