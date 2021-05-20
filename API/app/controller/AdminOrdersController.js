const Orders = require('../model/AdminOrdersModel');
const jwt = require('jsonwebtoken');

exports.getAllOrders = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            Orders.getAllOrders((err, Orders) => {
                if(err) {
                    res.send(err);
                }
                        
                res.json(Orders);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
};