"use strict";

const sql = require('./db');
const { v4: uuidv4 } = require('uuid');

let Orders = function(user) {
    this.id = uuidv4();
    this.user_id = user.user.id;
    this.status = 'Pendiente';
    this.order_date = new Date();
    this.delivery_date = null;
};

Orders.createOrder = function(order, result) {
    sql.query('INSERT INTO orders SET ?', order, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        
        result(null, res);
    });
};

Orders.addProductToAnOrder = function(product, result) {
    sql.query('INSERT INTO orders_products SET ?', product, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
};

Orders.getOrdersNotDelivered = function(id, result) {
    let query = `SELECT id, status, order_date, publication_date
    FROM orders
    WHERE user_id = ?`;

    sql.query(query, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
};

Orders.getProductsFromAnOrder = function(id, result) {
    let query = `SELECT bname, mname, amount, price, discount
    FROM orders_products
    INNER JOIN order ON order.id = orders_products.order_id
    INNER JOIN products ON products.id = orders_products.products.id
    WHERE user_id = ? AND order_id = ?`;

    sql.query(query, [id[1], id[0]], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
};

module.exports = Orders;