const AdminOrders = require('../model/AdminOrdersModel');
const jwt = require('jsonwebtoken');

exports.getAllOrders = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            AdminOrders.getAllOrders((err, orders) => {
                if(err) {
                    res.send(err);
                }
                        
                res.json(orders);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
};

exports.accept = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            AdminOrders.accept(req.params.id, (err, orders) => {
                if(err) {
                    res.send(err);
                }
                
                res.json(orders);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
};

exports.denegate = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            AdminOrders.denegate(req.params.id, (err, orders) => {
                if(err) {
                    res.send(err);
                }
                
                res.json(orders);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
};

exports.onWay = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            AdminOrders.onWay(req.params.id, (err, orders) => {
                if(err) {
                    res.send(err);
                }
                
                res.json(orders);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
};

exports.deliver = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            AdminOrders.deliver(req.params.id, (err, orders) => {
                if(err) {
                    res.send(err);
                }
                
                res.json(orders);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
};