"use strict";

const sql = require('./db');

let Images = function(id, image) {
    this.id = null;
    this.image = image;
    this.product_id = id;
}

Images.getImagesRoutes = function(id, result) {
    sql.query('SELECT image FROM images WHERE product_id = ?', id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

Images.saveImage = function(image, result) {
    sql.query('INSERT INTO images SET ?', image, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

module.exports = Images;