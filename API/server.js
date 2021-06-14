const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./app/routes/appRoutes');
const cors = require('cors');
const app = express();
const fs = require('fs');

let rawData = fs.readFileSync('./assets/config/config.json');
let data = JSON.parse(rawData);

// CORS
app.use(cors());

// Puerto que se va a utilizar
port = process.env.PORT || data.express;

// Arrancamos la api escuchando a dicho puerto
app.listen(port, () => {
    console.log('RESTful API server started on:' + port);
});

// BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rutas de la api
routes(app);