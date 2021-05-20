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
                INNER JOIN users ON users.id = orders.user_id`;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
};

module.exports = AdminOrders;