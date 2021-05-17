"use strict";

const sql = require('./db');
const { v4: uuidv4 } = require('uuid');

let Orders = function(user) {
    this.id = uuidv4();
    this.user_id = user.user.id;
    this.status = 1;
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
    let query = `SELECT orders.id AS id, status.name AS status, order_date, delivery_date
    FROM orders
    INNER JOIN status ON orders.status = status.id
    WHERE user_id = ? AND status NOT IN (2, 4)`;

    sql.query(query, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
};

Orders.getHistoryOrders = function(id, result) {
    let query = `SELECT orders.id AS id, status.name AS status, order_date, delivery_date
    FROM orders
    INNER JOIN status ON orders.status = status.id
    WHERE user_id = ? AND status IN (2, 4)`;

    sql.query(query, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
};

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

                result(null, res);
            });
        } else {
            result({nonExist: true, msg: 'No existe tal pedido pendiente'});
        }
    });
}

Orders.getProductsFromAnOrder = function(id, result) {
    let query = `SELECT IF(articles.name, concat(b1.name," ",articles.name), concat(b2.name," ",models.name)) AS name, orders_products.amount, orders_products.price, orders_products.discount
    FROM orders_products
    INNER JOIN orders ON orders.id = orders_products.order_id
    INNER JOIN products ON products.id = orders_products.product_id
    LEFT JOIN articles ON products.id = articles.id
    LEFT JOIN article_type ON articles.type = article_type.id
    LEFT JOIN brands AS b1 ON articles.brand = b1.id
    LEFT JOIN vehicles ON products.id = vehicles.id
    LEFT JOIN models ON vehicles.model_id = models.id
    LEFT JOIN brands AS b2 ON models.brand_id = b2.id
    WHERE user_id = ? AND order_id LIKE ?;`;

    sql.query(query, [id[1], id[0]], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
};

module.exports = Orders;