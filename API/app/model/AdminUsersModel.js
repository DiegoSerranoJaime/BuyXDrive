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
                    user_type.name as type
                FROM users 
                INNER JOIN user_type ON users.user_type = user_type.id
                INNER JOIN genders ON users.gender = genders.id`;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
};

AdminUsers.getAllEmployers = function(result) {
    
    let query = `SELECT  
                    users.id,
                    CONCAT(users.name, " ", users.surname) as name,
                    email,
                    genders.name as gender,
                    address,
                    phoneNumber,
                    user_type.name as type
                FROM users 
                INNER JOIN user_type ON users.user_type = user_type.id
                INNER JOIN genders ON users.gender = genders.id
                WHERE users.user_type <> 1`;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
};

module.exports = AdminUsers;