const AdminOrderProducts = require('../model/AdminOrderProductsModel');
const jwt = require('jsonwebtoken');

exports.getAll = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        AdminOrderProducts.getAll(req.params.id, (err, products) => {
            if(err) {
                res.send(err);
            }
            
            res.json(products);
        });
    
    });
    
};