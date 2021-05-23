"use strict";

const sql = require('./db');

let AdminOrders = function() {};

AdminOrders.getAllOrders = function(result) {
    
    let query = `SELECT 
                        orders.id AS id, 
                        status.name AS status, 
                        order_date, 
                        delivery_date,
                        users.name, 
                        users.surname, 
                        users.email, 
                        users.address, 
                        users.phoneNumber
                FROM orders
                INNER JOIN status ON orders.status = status.id
                INNER JOIN users ON users.id = orders.user_id
                ORDER BY orders.status, orders.id ASC `;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
};

AdminOrders.accept = function(id, result) {

    let query = `UPDATE orders SET status = 2 WHERE id = ?`;
    
    sql.query(query, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminOrders.getAllOrders(result);
    });
};

AdminOrders.denegate = function(id, result) {
    
    let query = `UPDATE orders SET status = 6 WHERE id = ?`;

    sql.query(query, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminOrders.getAllOrders(result);
    });
};

AdminOrders.onWay = function(id, result) {
    
    let query = `UPDATE orders SET status = 3 WHERE id = ?`;

    sql.query(query, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminOrders.getAllOrders(result);
    });
};

AdminOrders.deliver = function(id, result) {
    let currentDate = new Date(); 
    let query = `UPDATE orders SET status = 4, delivery_date = ? WHERE id = ?`;

    sql.query(query, [currentDate, id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminOrders.getAllOrders(result);
    });
};


module.exports = AdminOrders;