'use strict';

const mysql = require('mysql');

// Conexión local a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'buyxdrive'
});

// En el caso de que haya un error en la conexión lanzamos el error
connection.connect((err) => {
    if (err) throw err;
});

module.exports = connection;