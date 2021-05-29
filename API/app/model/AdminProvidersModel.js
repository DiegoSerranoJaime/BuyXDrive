"use strict";

const sql = require('./db');

let AdminProviders = function(id, provider) {
    this.id = id >= 0 ? id : null;
    this.name = provider.name;
    this.phone_number = provider.phoneNumber;
    this.email = provider.email;
    this.address = provider.address;
    this.active = true;
}

AdminProviders.getAll = function(result) {
    
    let query = `SELECT * FROM providers ORDER BY active DESC, id ASC`;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

AdminProviders.getById = function(id, result) {
    
    let query = `SELECT name, email, address, phone_number FROM providers WHERE id = ?`;

    sql.query(query, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

AdminProviders.logicDelete = function(id, result) {
    
    let query = `UPDATE providers SET active = 0 WHERE id = ?`;

    sql.query(query, id ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminProviders.getAll(result);
    });
}

AdminProviders.reactive = function(id, result) {
    
    let query = `UPDATE providers SET active = 1 WHERE id = ?`;

    sql.query(query, id ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminProviders.getAll(result);
    });
}

AdminProviders.delete = function(id, result) {
    
    let query = `DELETE FROM providers WHERE id = ?`;

    sql.query(query, id ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminProviders.getAll(result);
    });
}

AdminProviders.add = function(provider, result) {
    
    let query = `INSERT INTO providers SET ?`;

    sql.query(query, provider ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminProviders.getAll(result);
    });
}

AdminProviders.update = function(provider, result) {
    
    let query = `UPDATE providers SET name = ?, email = ?, address = ?, phone_number = ? WHERE id = ?`;

    sql.query(query, [provider.name, provider.email, provider.address, provider.phone_number, provider.id] ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminProviders.getAll(result);
    });
}


module.exports = AdminProviders;