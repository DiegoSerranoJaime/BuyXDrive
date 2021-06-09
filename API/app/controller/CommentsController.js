const Comments = require('../model/CommentsModel');
const jwt = require('jsonwebtoken')

exports.addComment = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {

        if (err) {
            res.sendStatus(403);
        } else {

            let comment = new Comments(req.body, authData);
            
            if (!comment.user_id || !comment.title || !comment.body || !comment.valoration) {
                res.sendStatus(400).send({error: true,  message: 'No data send'});
            } else if (comment.body.length > 50 || comment.body.length > 255) {
                res.sendStatus(400).send({error: true,  message: 'The data sending surprass the limit of character of the body or title'});
            } else if (comment.title.length < 5 || comment.body.length < 10) {
                res.sendStatus(400).send({error: true,  message: 'The data sending has less characters the minimun limit of character of the body or title'});
            } else if (comment.valoration > 5 || comment.valoration.length < 0) {
                res.sendStatus(400).send({error: true,  message: 'The valoration value isnt between the established limits'});
            } else {
                Comments.addComment(comment, (err, data) => {
                    if(err) {
                        res.send(err);
                    }

                    if (data.duplicate) {
                        res.send({
                            ok: false,
                            msg: 'Ya existe un comentario suyo en este producto'
                        });
                    } else {
                        res.send({
                            ok: true,
                            msg: 'Su comentario se ha insertado satisfactoriamente'
                        });
                    }

                });
            }
        }
    });
}

exports.getCommentsOfAProduct = function(req, res) {
    Comments.getCommentsOfAProduct(req.params.id, (err, comments) => {
        if(err) {
            res.send(err);
        }
        
        res.json(comments);
    });
}

exports.commentAlreadyExistValidation = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.send(err);
        } else {
            Comments.commentAlreadyExistValidation([authData.user.id, req.params.productId], (err, comment) => {
                if(err) {
                    res.send(err);
                }
                
                if (comment.length) {
                    res.send({
                        ok: true
                    });
                } else {
                    res.send({
                        ok: false
                    });
                }
            });   
        }
    });
}