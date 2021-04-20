module.exports = function(app) {
    // Controladores de categorias y productos que tienen las funciones
    let users = require('../controller/UsersController');
    let vehicles = require('../controller/VehiclesController');
    let images = require('../controller/ImagesController');
    let comments = require('../controller/CommentsController');
    
    //Endpoints de login y registro
    app.route('/api/user/login')
        .post(users.login);
        
    app.route('/api/user/register')
        .post(users.register);

    //Endpoint de Images
    app.route('/api/images/product/:id')
        .get(images.getImagesOfAProduct);

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
        .post(verifyToken, comments.addComment)
        .get(comments.getCommentsOfAProduct);

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
