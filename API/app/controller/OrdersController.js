const Orders = require('../model/OrdersModel');
const jwt = require('jsonwebtoken');

exports.createOrder = function(req, res) {    
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        
        if (err) {
            res.sendStatus(403);
        } else {
            let order = new Orders(authData);
            
            Orders.createOrder(order, (err, data) => {
                if(err) {
                    res.send(err);
                }

                res.send({
                    ok: true,
                    msg: 'Pedido creado',
                    order_id: order.id
                });
            });
        }
    });
};

exports.addProductToAnOrder = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            let order = new OrderProduct(req.body);
            
            Orders.addProductToAnOrder(order, (err, data) => {
                if(err) {
                    res.send(err);
                }

                res.send({
                    ok: true,
                    msg: 'Producto agregado',
                    data: data
                });
            });
        }
    });
}

exports.getOrdersNotDelivered = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {

        if (err) {
            res.sendStatus(403);
        } else {
            Orders.getOrdersNotDelivered(authData.user.id, (err, data) => {
                if(err) {
                    res.send(err);
                }

                res.send(data);
            });
        }
    });
}

exports.getHistoryOrders = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {

        if (err) {
            res.sendStatus(403);
        } else {
            Orders.getHistoryOrders(authData.user.id, (err, data) => {
                if(err) {
                    res.send(err);
                }

                res.send(data);
            });
        }
    });
}

exports.cancelOrder = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {

        let id = [req.params.id, authData.user.id];

        if (err) {
            res.sendStatus(403);
        } else {
            Orders.cancelOrder(id, (err, data) => {
                if(err) {
                    res.send(err);
                }

                if(data.nonExist) {
                    res.send({ok: false, msg: data.msg});
                } else {
                    res.send({ok: true, data: data});
                }
            });
        }
    });
}

exports.getProductsFromAnOrder = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            Orders.getProductsFromAnOrder([req.params.id, authData.user.id], (err, products) => {
                if(err) {
                    res.send(err);
                }
                
                res.json(products);
            });
        }
    });
    
};

let OrderProduct = function(product) {
    this.order_id = product.order_id;
    this.product_id = product.product_id;
    this.amount = product.amount;
    this.price = product.price;
    this.discount = product.discount;  
};