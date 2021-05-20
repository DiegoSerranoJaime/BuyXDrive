"use strict";

const sql = require('./db');

let AdminProviders = function() {};

AdminProviders.getAllProviders = function(result) {
    
    let query = `SELECT * FROM providers`;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
};

module.exports = AdminProviders;