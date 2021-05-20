const Articles = require('../model/AdminArticlesModel');
const jwt = require('jsonwebtoken');

exports.getAllArticles = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (authData.user.user_type == 2) {
            Articles.getAllArticles((err, articles) => {
                if(err) {
                    res.send(err);
                }
                        
                res.json(articles);
            });
        } else {
            res.json({ok: false, msg: 'Permission denied'});
        }
    });
};

imageRoute = function(data) {
    for (let i = 0; i < data.length; i++) {
        data[i].image = 'http://localhost:3000/api/images/' + data[i].image;
    }

    return data;
}