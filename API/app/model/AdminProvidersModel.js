"use strict";

const sql = require('./db');

let AdminProviders = function() {};

AdminProviders.getAllProviders = function(result) {
    
    let query = `SELECT * FROM providers ORDER BY active DESC, id ASC`;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
};

AdminProviders.logicDelete = function(id, result) {
    
    let query = `UPDATE providers SET active = 0 WHERE id = ?`;

    sql.query(query, id ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
};

AdminProviders.reactive = function(id, result) {
    
    let query = `UPDATE providers SET active = 1 WHERE id = ?`;

    sql.query(query, id ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
};

AdminProviders.delete = function(id, result) {
    
    let query = `DELETE FROM providers WHERE id = ?`;

    sql.query(query, id ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminProviders.getAllProviders(result);
    });
};


module.exports = AdminProviders;