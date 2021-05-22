"use strict";

const sql = require('./db');

let AdminEmployers = function() {};

AdminEmployers.getAllEmployers = function(result) {
    
    let query = `SELECT  
                    users.id,
                    CONCAT(users.name, " ", users.surname) as name,
                    email,
                    genders.name as gender,
                    address,
                    phoneNumber,
                    user_type.name as type,
                    active
                FROM users 
                INNER JOIN user_type ON users.user_type = user_type.id
                INNER JOIN genders ON users.gender = genders.id
                WHERE users.user_type <> 1
                ORDER BY active DESC, users.id ASC`;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
};

AdminEmployers.logicDelete = function(id, result) {
    
    let query = `UPDATE users SET active = 0 WHERE id = ?`;

    sql.query(query, id ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
};

AdminEmployers.reactive = function(id, result) {
    
    let query = `UPDATE users SET active = 1 WHERE id = ?`;

    sql.query(query, id ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
};

AdminEmployers.delete = function(id, result) {
    
    let query = `DELETE FROM users WHERE id = ?`;

    sql.query(query, id ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminEmployers.getAllEmployers(result);
    });
};

module.exports = AdminEmployers;