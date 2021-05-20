const Providers = require('../model/AdminProvidersModel');
const jwt = require('jsonwebtoken');

exports.getAllProviders = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            Providers.getAllProviders((err, providers) => {
                if(err) {
                    res.send(err);
                }
                        
                res.json(providers);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
};