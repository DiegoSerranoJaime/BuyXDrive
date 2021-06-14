'use strict';

const mysql = require('mysql');
const fs = require('fs');

let rawData = fs.readFileSync('./assets/config/config.json');
let data = JSON.parse(rawData);

// Conexión local a la base de datos
const connection = mysql.createConnection({
    host: data.mysql.host,
    user: data.mysql.user,
    password: data.mysql.password,
    database: data.mysql.database
});

// En el caso de que haya un error en la conexión lanzamos el error
connection.connect((err) => {
    if (err) throw err;
});

module.exports = connection;