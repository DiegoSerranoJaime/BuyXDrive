"use strict";

const sql = require('./db');

let AdminUsers = function() {};

AdminUsers.getAllUsers = function(result) {
    
    let query = `SELECT  
                    users.id,
                    CONCAT(users.name, " ", users.surname) as name,
                    email,
                    genders.name as gender,
                    address,
                    phoneNumber,
                    active
                FROM users 
                INNER JOIN user_type ON users.user_type = user_type.id
                INNER JOIN genders ON users.gender = genders.id
                WHERE user_type = 1
                ORDER BY active DESC, users.id ASC`;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
};

AdminUsers.logicDelete = function(id, result) {
    
    let query = `UPDATE users SET active = 0 WHERE id = ?`;

    sql.query(query, id ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminUsers.getAllUsers(result);
    });
};

AdminUsers.reactive = function(id, result) {
    
    let query = `UPDATE users SET active = 1 WHERE id = ?`;

    sql.query(query, id ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminUsers.getAllUsers(result);
    });
};

AdminUsers.delete = function(id, result) {
    
    let query = `DELETE FROM users WHERE id = ?`;

    sql.query(query, id ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminUsers.getAllUsers(result);
    });
};

module.exports = AdminUsers;