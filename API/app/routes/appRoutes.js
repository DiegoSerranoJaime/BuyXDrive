
module.exports = function(app) {
    // Controladores de categorias y productos que tienen las funciones
    const Users = require('../controller/UsersController');
    const Products = require('../controller/ProductsController');
    const Vehicles = require('../controller/VehiclesController');
    const Articles = require('../controller/ArticlesController');
    const Images = require('../controller/ImagesController');
    const Comments = require('../controller/CommentsController');
    const Orders = require('../controller/OrdersController');
    const AdminUsers = require('../controller/AdminUsersController');
    const AdminEmployers = require('../controller/AdminEmployersController');
    const AdminVehicles = require('../controller/AdminVehiclesController');
    const AdminArticles = require('../controller/AdminArticlesController');
    const AdminOrders = require('../controller/AdminOrdersController');
    const AdminOrderProducts = require('../controller/AdminOrderProductsController');
    const AdminProviders = require('../controller/AdminProvidersController');


    //Endpoints de login y registro
    app.route('/api/user/login')
        .post(Users.login);
        
    app.route('/api/user/register')
        .post(Users.register);

    app.route('/api/user/genders')
        .get(Users.getAllGenders);

    //Endpoint de admin
        //Endpoint de users
        app.route('/api/admin/users')
            .get(verifyToken, AdminUsers.getAllUsers);

        app.route('/api/admin/users/logicDelete/:id')
            .get(verifyToken, AdminUsers.logicDelete);

        app.route('/api/admin/users/reactive/:id')
            .get(verifyToken, AdminUsers.reactive);

        app.route('/api/admin/users/delete/:id')
            .get(verifyToken, AdminUsers.delete);

        //Endpoint de employers
        app.route('/api/admin/employers')
            .get(verifyToken, AdminEmployers.getAllEmployers);

        app.route('/api/admin/employers/logicDelete/:id')
            .get(verifyToken, AdminEmployers.logicDelete);

        app.route('/api/admin/employers/reactive/:id')
            .get(verifyToken, AdminEmployers.reactive);

        app.route('/api/admin/employers/delete/:id')
            .get(verifyToken, AdminEmployers.delete);

        //Endpoints de vehicles
        app.route('/api/admin/vehicles')
            .get(verifyToken, AdminVehicles.getAllVehicles);

        app.route('/api/admin/vehicles/logicDelete/:id')
            .get(verifyToken, AdminVehicles.logicDelete);

        app.route('/api/admin/vehicles/reactive/:id')
            .get(verifyToken, AdminVehicles.reactive);

        app.route('/api/admin/vehicles/delete/:id')
            .get(verifyToken, AdminVehicles.delete);

        //Endpoints de articles
        app.route('/api/admin/articles')
            .get(verifyToken, AdminArticles.getAllArticles);

        app.route('/api/admin/articles/logicDelete/:id')
            .get(verifyToken, AdminArticles.logicDelete);

        app.route('/api/admin/articles/reactive/:id')
            .get(verifyToken, AdminArticles.reactive);

        app.route('/api/admin/articles/delete/:id')
            .get(verifyToken, AdminArticles.delete);

        //Endpoints de pedidos
        app.route('/api/admin/orders')
            .get(verifyToken, AdminOrders.getAllOrders);

        app.route('/api/admin/orders/:id')
            .get(verifyToken, AdminOrderProducts.getAll);
    
        //Endpoints de proveedores
        app.route('/api/admin/providers')
            .get(verifyToken, AdminProviders.getAllProviders);

        app.route('/api/admin/providers/logicDelete/:id')
            .get(verifyToken, AdminProviders.logicDelete);

        app.route('/api/admin/providers/reactive/:id')
            .get(verifyToken, AdminProviders.reactive);

        app.route('/api/admin/providers/delete/:id')
            .get(verifyToken, AdminProviders.delete);

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
        
    app.route('/api/orders/product')
        .post(verifyToken, Orders.addProductToAnOrder);

    app.route('/api/orders/:id/products')
        .get(verifyToken, Orders.getProductsFromAnOrder);
        
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
