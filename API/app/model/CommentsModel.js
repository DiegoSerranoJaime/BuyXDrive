"use strict";

const sql = require('./db');

let Comments = function(comment, user, product_id) {
    this.user_id = user.user.id;
    this.product_id = product_id;
    this.title = comment.title;
    this.body = comment.body;
    this.valoration = comment.valoration;
    this.publication_date = new Date();
};

Comments.addComment = function(comment, result) {
    sql.query('INSERT INTO comments SET ?', comment, (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
};

Comments.getCommentsOfAProduct = function(id, result) {
    let query = `SELECT email, image, title, body, valoration, publication_date
    FROM comments
    INNER JOIN users ON users.id = comments.user_id
    WHERE product_id = ?
    ORDER BY publication_date DESC`;

    sql.query(query, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }

        result(null, res);
    });
};

module.exports = Comments;