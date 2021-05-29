const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./app/routes/appRoutes');
const cors = require('cors');
const app = express();
// const ws = require('websocket').client;

// CORS
app.use(cors());

// Puerto que se va a utilizar
port = process.env.PORT || 3000;

// Arrancamos la api escuchando a dicho puerto
app.listen(port, () => {
    console.log('RESTful API server started on:' + port);
});

// BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rutas de la api
routes(app);