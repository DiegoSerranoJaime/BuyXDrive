const AdminUserOrders = require('../model/AdminUserOrdersModel');
const jwt = require('jsonwebtoken');

exports.getAll = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.userType == 2) {
            AdminUserOrders.getAll(req.params, (err, orders) => {
                if(err) {
                    res.send(err);
                }
                        
                res.json(orders);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}

exports.accept = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.userType == 2) {
            AdminUserOrders.accept(req.params, (err, orders) => {
                if(err) {
                    res.send(err);
                }
                
                res.json(orders);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}

exports.denegate = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.userType == 2) {
            AdminUserOrders.denegate(req.params, (err, orders) => {
                if(err) {
                    res.send(err);
                }
                
                res.json(orders);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}

exports.onWay = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.userType == 2) {
            AdminUserOrders.onWay(req.params, (err, orders) => {
                if(err) {
                    res.send(err);
                }
                
                res.json(orders);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}

exports.deliver = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.userType == 2) {
            AdminUserOrders.deliver(req.params, (err, orders) => {
                if(err) {
                    res.send(err);
                }
                
                res.json(orders);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
}