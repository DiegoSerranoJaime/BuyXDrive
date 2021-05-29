"use strict";

const sql = require('./db');
const hash = require('crypto');

let Users = function(user) {
    this.id = null;
    this.name = user.name;
    this.surname = user.surname;
    this.email = user.email;
    this.password = hash.createHash('sha256').update(user.password).digest('hex');
    this.gender = user.gender;
    this.address = user.address;
    this.phone_number = user.phoneNumber;
    this.user_type = 1;
}

Users.login = function(user, result) {
    sql.query("SELECT * FROM users WHERE email = ? AND password = ? AND active = 1", [user.email,  hash.createHash('sha256').update(user.password).digest('hex')], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        console.log(res);

        result(null, res);
    });
}

Users.register = function(user, result) {
    sql.query("SELECT email FROM users WHERE email = ?", user.email, (err, res) => {
        if (res.length == 0) {
            sql.query("INSERT INTO users SET ?", user, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                
                result(null, res);
            });
        } else {
            result(null, {
                duplicate: true,
                msg: 'El correó electrónico ya existe'
            });
        }
    });
}

Users.getAllGenders = function(result) {
    sql.query("SELECT * FROM genders", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null)
        }

        result(null, res)
    })
}

Users.getAllEmployerTypes = function(result) {
    sql.query("SELECT * FROM user_type WHERE id > 1", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null)
        }

        result(null, res)
    })
}

module.exports = Users;