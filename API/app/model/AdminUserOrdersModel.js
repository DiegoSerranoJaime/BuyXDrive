"use strict";

const sql = require('./db');

let AdminUserOrders = function() {}

AdminUserOrders.getAll = function(id, result) {
    
    let query = `SELECT 
                    orders.id AS id, 
                    status.name AS status, 
                    order_date, 
                    delivery_date
                FROM orders
                INNER JOIN status ON orders.status = status.id
                WHERE user_id = ?
                ORDER BY orders.status, orders.id ASC `;

    sql.query(query, id.userId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

AdminUserOrders.accept = function(id, result) {

    let query = `UPDATE orders SET status = 2 WHERE id = ? AND user_id = ?`;
    
    sql.query(query, [id.orderId, id.userId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminUserOrders.getAll(id, result);
    });
}

AdminUserOrders.denegate = function(id, result) {
    
    let query = `UPDATE orders SET status = 6 WHERE id = ? AND user_id = ?`;

    sql.query(query, [id.orderId, id.userId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminUserOrders.getAll(id, result);
    });
}

AdminUserOrders.onWay = function(id, result) {
    
    let query = `UPDATE orders SET status = 3 WHERE id = ? AND user_id = ?`;

    sql.query(query, [id.orderId, id.userId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminUserOrders.getAll(id, result);
    });
}

AdminUserOrders.deliver = function(id, result) {
    let currentDate = new Date(); 
    let query = `UPDATE orders SET status = 4, delivery_date = ? WHERE id = ? AND user_id = ?`;

    sql.query(query, [currentDate, id.orderId, id.userId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminUserOrders.getAll(id , result);
    });
}


module.exports = AdminUserOrders;