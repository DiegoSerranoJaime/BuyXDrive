module.exports = function(app) {
    // Controladores de categorias y productos que tienen las funciones
    let users = require('../controller/UsersController');
    let vehicles = require('../controller/VehiclesController');
    let images = require('../controller/ImagesController');
    let comments = require('../controller/CommentsController');
    let orders = require('../controller/OrdersController');
    
    //Endpoints de login y registro
    app.route('/api/user/login')
        .post(users.login);
        
    app.route('/api/user/register')
        .post(users.register);

    app.route('/api/user/genders')
        .get(users.getAllGenders);

    //Endpoint de Images
    app.route('/api/images/product/:id')
        .get(images.getImagesRoutes);
        
    app.route('/api/images/:image')
        .get(images.getImage);

    //Endpoints de vehiculos
    app.route('/api/vehicles/init')
        .get(vehicles.getInitVehicles);

    app.route('/api/vehicles/:id')
        .get(vehicles.getVehicle);

    app.route('/api/vehicles/cart/:id')
        .get(vehicles.getVehicleCart);

    app.route('/api/vehicles/type')
        .get(vehicles.getVehicleTypes);

    app.route('/api/vehicles/type/:type/selected_vehicle/:id')
        .get(vehicles.getInitVehiclesByType);

    //Endpoints de comentarios    
    app.route('/api/comments/products/:id')
        .get(comments.getCommentsOfAProduct);
    
    app.route('/api/comments/products')
        .post(verifyToken, comments.addComment);

    //Endpoints para pedidos
    app.route('/api/orders')
        .post(verifyToken, orders.createOrder);

    app.route('/api/orders/not-delivered')
        .get(verifyToken, orders.getOrdersNotDelivered);
        
        app.route('/api/orders/history')
        .get(verifyToken, orders.getHistoryOrders);
        
    app.route('/api/orders/:id/products')
        .get(verifyToken, orders.getProductsFromAnOrder);
    
    app.route('/api/orders/product')
        .post(verifyToken, orders.addProductToAnOrder);
    

    app.route('/api/orders/:id/cancel')
        .get(verifyToken, orders.cancelOrder);

    

    // JSON web token use example
    // app.route('/api/user/reserve')
    //     .post(verifyToken, stockpiles.reserve)
    //     .get(verifyToken, stockpiles.getAllStockpiles);


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
