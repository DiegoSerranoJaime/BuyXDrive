"use strict";

const sql = require('./db');

let AdminProvidersProducts = function(ids, product) {
    this.provider_id = ids.providerId;
    this.product_id = product.productId >= 0 ? product.productId : ids.productId;
    this.price = product.price;
    this.amount = product.amount;
    this.order_date = new Date();
    this.delivery_date = null;
    this.status = 1;
}

AdminProvidersProducts.getAll = function(id, result) {
    
    let query = `SELECT 
                    products.id,
                    IF(articles.id, concat(b1.name," ",articles.name), concat(b2.name," ",models.name)) AS name,
                    providers_products.price as price,
                    providers_products.amount,
                    order_date,
                    delivery_date,
                    status.name as status
                FROM providers_products
                INNER JOIN products ON providers_products.product_id = products.id
                LEFT JOIN articles ON products.id = articles.id
                LEFT JOIN article_type ON articles.type = article_type.id
                LEFT JOIN brands AS b1 ON articles.brand = b1.id
                LEFT JOIN vehicles ON products.id = vehicles.id
                LEFT JOIN models ON vehicles.model_id = models.id
                LEFT JOIN brands AS b2 ON models.brand_id = b2.id
                LEFT JOIN status ON providers_products.status = status.id
                WHERE provider_id = ?`;

    sql.query(query, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

AdminProvidersProducts.getById = function(id, result) {
    
    let query = `SELECT 
                    product_id,
                    amount,
                    price
                FROM providers_products
                WHERE provider_id = ? AND product_id = ?`;

    sql.query(query, [id.providerId, id.productId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

AdminProvidersProducts.delete = function(id, result) {
    
    let query = `DELETE FROM providers_products WHERE provider_id = ? AND product_id = ?`;

    sql.query(query, [id.providerId, id.productId] ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminProvidersProducts.getAll(id.providerId, result);
    });
}

AdminProvidersProducts.add = function(product, result) {
    
    let query = `INSERT INTO providers_products SET ?`;

    sql.query(query, product ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminProvidersProducts.getAll(product.provider_id, result);
    });
}

AdminProvidersProducts.deliver = function(id, result) {

    let query = `UPDATE providers_products SET status = 4, delivery_date = ? WHERE provider_id = ? AND product_id = ?`;
    
    sql.query(query, [new Date(), id.providerId, id.productId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminProvidersProducts.getAll(id.providerId, result);
    });
}

AdminProvidersProducts.cancel = function(id, result) {

    let query = `UPDATE providers_products SET status = 5 WHERE provider_id = ? AND product_id = ?`;
    
    sql.query(query, [id.providerId, id.productId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminProvidersProducts.getAll(id.providerId, result);
    });
}

module.exports = AdminProvidersProducts;