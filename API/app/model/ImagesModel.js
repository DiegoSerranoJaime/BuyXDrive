"use strict";

const sql = require('./db');

let Images = function() {};

Images.getImagesOfAProduct = function(id, result) {
    sql.query('SELECT image FROM images WHERE product_id = ?', id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
};

module.exports = Images;