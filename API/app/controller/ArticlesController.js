const Articles = require('../model/ArticlesModel');

exports.getAllArticles = function(req, res) {
    Articles.getAllArticles((err, vehicles) => {
        if(err) {
            res.send(err);
        }

        vehicles = imageRoute(vehicles);
        
        res.json(vehicles);
    });
};

exports.getInitArticles = function(req, res) {
    Articles.getInitArticles((err, vehicles) => {
        if(err) {
            res.send(err);
        }

        vehicles = imageRoute(vehicles);
        
        res.json(vehicles);
    });
};

exports.getInitArticlesByType = function(req, res) {
    Articles.getInitArticlesByType([req.params.type, req.params.id], (err, vehicles) => {
        if(err) {
            res.send(err);
        }

        vehicles = imageRoute(vehicles);
        
        res.json(vehicles);
    });
};

exports.getArticlesTypes = function(req, res) {
    Articles.getArticlesTypes((err, types) => {
        if(err) {
            res.send(err);
        }
        
        res.json(types);
    });
};

exports.getArticlesBrands = function(req, res) {
    Articles.getArticlesBrands((err, brands) => {
        if(err) {
            res.send(err);
        }
        
        res.json(brands);
    });
};

exports.getArticlesMaxPrice = function(req, res) {
    Articles.getArticlesMaxPrice((err, maxPrice) => {
        if(err) {
            res.send(err);
        }
        
        res.json(maxPrice);
    });
};

imageRoute = function(data) {
    for (let i = 0; i < data.length; i++) {
        data[i].image = 'http://localhost:3000/api/images/' + data[i].image;
    }

    return data;
}