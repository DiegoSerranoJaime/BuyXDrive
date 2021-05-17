module.exports = function(app) {
    // Controladores de categorias y productos que tienen las funciones
    let Users = require('../controller/UsersController');
    let Products = require('../controller/ProductsController');
    let Vehicles = require('../controller/VehiclesController');
    let Articles = require('../controller/ArticlesController');
    let Images = require('../controller/ImagesController');
    let Comments = require('../controller/CommentsController');
    let Orders = require('../controller/OrdersController');
    
    //Endpoints de login y registro
    app.route('/api/user/login')
        .post(Users.login);
        
    app.route('/api/user/register')
        .post(Users.register);

    app.route('/api/user/genders')
        .get(Users.getAllGenders);

    //Endpoint de Images
    app.route('/api/images/product/:id')
        .get(Images.getImagesRoutes);
        
    app.route('/api/images/:image')
        .get(Images.getImage);

    //Endpoints de vehiculos
    app.route('/api/vehicles')
        .get(Vehicles.getAllVehicles);

    app.route('/api/vehicles/init')
        .get(Vehicles.getInitVehicles);

    app.route('/api/vehicles/brands')
        .get(Vehicles.getVehiclesBrands);

    app.route('/api/vehicles/types')
        .get(Vehicles.getVehiclesTypes);

    app.route('/api/vehicles/maxPrice')
        .get(Vehicles.getVehiclesMaxPrice);

    app.route('/api/vehicles/:id')
        .get(Vehicles.getVehicle);

    app.route('/api/vehicles/types/:type/selected_vehicle/:id')
        .get(Vehicles.getInitVehiclesByType);

    //Endpoint de articulos
    app.route('/api/articles')
        .get(Articles.getAllArticles);

    app.route('/api/articles/init')
        .get(Articles.getInitArticles);

    app.route('/api/articles/brands')
        .get(Articles.getArticlesBrands);

    app.route('/api/articles/types')
        .get(Articles.getArticlesTypes);

    app.route('/api/articles/maxPrice')
        .get(Articles.getArticlesMaxPrice);

    app.route('/api/articles/:id')
        .get(Articles.getArticle);

    app.route('/api/articles/types/:type/selected_article/:id')
        .get(Articles.getInitArticlesByType);

    //Endpoint de productso
    app.route('/api/products/cart/:id')
        .get(Products.getProductCart);

    //Endpoints de comentarios    
    app.route('/api/comments/products/:id')
        .get(Comments.getCommentsOfAProduct);
    
    app.route('/api/comments/products')
        .post(verifyToken, Comments.addComment);

    //Endpoints para pedidos
    app.route('/api/orders')
        .post(verifyToken, Orders.createOrder);

    app.route('/api/orders/not-delivered')
        .get(verifyToken, Orders.getOrdersNotDelivered);
        
        app.route('/api/orders/history')
        .get(verifyToken, Orders.getHistoryOrders);
        
    app.route('/api/orders/:id/products')
        .get(verifyToken, Orders.getProductsFromAnOrder);
    
    app.route('/api/orders/product')
        .post(verifyToken, Orders.addProductToAnOrder);

    app.route('/api/orders/:id/cancel')
        .get(verifyToken, Orders.cancelOrder);

    function verifyToken(req, res, next) {
        const bearerHeader = req.headers['authorization'];
        
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
    
            const bearerToken = bearer[1];
    
            req.token = bearerToken;
            next();
        } else {
            res.sendStatus(403);
        }
    }
}
