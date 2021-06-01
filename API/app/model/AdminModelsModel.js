"use strict";

const sql = require('./db');

let AdminModels = function(id, model) {
    this.id = id.modelId >= 0 ? id.modelId : null;
    this.name = model.name;
    this.brand_id = id.brandId >= 0 ? id.brandId : null;
}

AdminModels.getAll = function(id, result) {
    
    let query = `SELECT  
                    models.id,
                    name,
                    IF(COUNT(models.id) > 0, COUNT(models.id), 0) AS vehicles
                FROM models
                LEFT JOIN vehicles ON models.id = vehicles.model_id
                WHERE brand_id = ?
                GROUP BY models.id`;

    sql.query(query, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

AdminModels.getById = function(id, result) {
    
    let query = `SELECT  
                    name
                FROM models
                WHERE brand_id = ? AND id = ?`;

    sql.query(query, [id.brandId, id.modelId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
}

AdminModels.delete = function(id, result) {
    
    let query = `DELETE FROM models WHERE id = ?`;

    sql.query(query, id.modelId ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminModels.getAll(id.brandId, result);
    });
}

AdminModels.add = function(model, result) {
    let query = `INSERT INTO models SET ?`;
    
    sql.query(query, model, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminModels.getAll(model.brand_id, result);
    });
}

AdminModels.update = function(model, result) {
    let query = `UPDATE models SET ? WHERE id = ?`;

    sql.query(query, [model, model.id] ,(err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        return AdminModels.getAll(model.brand_id, result);
    });

}

module.exports = AdminModels;