"use strict";

const sql = require('./db');
const hash = require('crypto');

let Users = function(user) {
    this.id = null;
    this.name = user.name;
    this.surname = user.surname;
    this.email = user.email;
    this.password = hash.createHash('sha256').update(user.password).digest('hex');
    this.address = user.address;
    this.phoneNumber = user.phoneNumber;
    this.user_type = 1;
};

Users.login = function(user, result) {
    sql.query("SELECT * FROM users WHERE email = ? AND password = ?", [user.email,  hash.createHash('sha256').update(user.password).digest('hex')], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
};

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
};

module.exports = Users;