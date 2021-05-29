"use strict";

const sql = require('./db');
const { v4: uuidv4 } = require('uuid');

let Orders = function(user) {
    this.id = uuidv4();
    this.user_id = user.user.id;
    this.status = 1;
    this.order_date = new Date();
    this.delivery_date = null;
}

Orders.createOrder = function(order, result) {
    sql.query('INSERT INTO orders SET ?', order, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        
        result(null, res);
    });
}

Orders.addProductToAnOrder = function(product, result) {
    sql.query('INSERT INTO orders_products SET ?', product, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

Orders.getOrdersNotDelivered = function(id, result) {
    let query = `SELECT orders.id AS id, status.name AS status, order_date, delivery_date
    FROM orders
    INNER JOIN status ON orders.status = status.id
    WHERE user_id = ? AND status NOT IN (4, 5, 6)`;

    sql.query(query, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

Orders.getHistoryOrders = function(id, result) {
    let query = `SELECT orders.id AS id, status.name AS status, order_date, delivery_date
    FROM orders
    INNER JOIN status ON orders.status = status.id
    WHERE user_id = ? AND status IN (4, 5, 6)`;

    sql.query(query, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

Orders.cancelOrder = function(id, result) {
    sql.query("SELECT * FROM orders WHERE id = ? AND status = 1 AND user_id = ?", [id[0], id[1]], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        if (res.length != 0) {
            sql.query("UPDATE orders SET status = 2 WHERE id = ? AND user_id = ?", [id[0], id[1]], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                }

                return Orders.getOrdersNotDelivered(id, result);
            });
        } else {
            result({nonExist: true, msg: 'No existe tal pedido pendiente'});
        }
    });
}

module.exports = Orders;