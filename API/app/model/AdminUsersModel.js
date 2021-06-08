"use strict";

const sql = require('./db');
const hash = require('crypto');

let AdminUsers = function(id, user) {
    this.id = id >= 0 ? id : null;
    this.name = user.name;
    this.surname = user.surname;
    this.email = user.email;
    this.password = hash.createHash('sha256').update(user.password).digest('hex');
    this.gender = user.gender;
    this.address = user.address;
    this.phone_number = user.phoneNumber;
    this.user_type = 1;
    this.active = true;
}

AdminUsers.getAll = function(result) {
    
    let query = `SELECT  
                    users.id,
                    CONCAT(users.name, " ", users.surname) as name,
                    email,
                    genders.name as gender,
                    address,
                    phone_number,
                    active
                FROM users 
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
}

AdminUsers.getById = function(id, result) {
    
    let query = `SELECT  
                    users.id,
                    name,
                    surname,
                    email,
                    gender,
                    address,
                    phone_number
                FROM users 
                WHERE user_type = 1 AND id = ?`;

    sql.query(query, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

AdminUsers.logicDelete = function(id, result) {
    
    let query = `UPDATE users SET active = 0 WHERE id = ?`;

    sql.query(query, id ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminUsers.getAll(result);
    });
}

AdminUsers.reactive = function(id, result) {
    
    let query = `UPDATE users SET active = 1 WHERE id = ?`;

    sql.query(query, id ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminUsers.getAll(result);
    });
}

AdminUsers.delete = function(id, result) {
    
    let query = `DELETE FROM users WHERE id = ?`;

    sql.query(query, id ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminUsers.getAll(result);
    });
}

AdminUsers.add = function(user, result) {
    let query = `INSERT INTO users SET ?`;

    sql.query("SELECT email FROM users WHERE email = ?", user.email, (err, res) => {
        if (res.length == 0) {
            sql.query(query, user ,(err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                }
        
                return AdminUsers.getAll(result);
            });
        } else {
            result(null, {
                duplicate: true,
                msg: 'El correó electrónico ya existe'
            });
        }
    });

}

AdminUsers.update = function(user, result) {
    let query = `UPDATE users SET name = ?, surname = ?, email = ?, password = ?, address = ?, phone_number = ?, user_type = ?, gender = ? , active = ? WHERE id = ?`;

    sql.query(query, [user.name, user.surname, user.email, user.password, user.address, user.phone_number, user.user_type, user.gender, user.active, user.id] ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminUsers.getAll(result);
    });         
}

module.exports = AdminUsers;