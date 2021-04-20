const Comments = require('../model/CommentsModel');
const jwt = require('jsonwebtoken')

exports.addComment = function(req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        let comment = new Comments(req.body, authData, req.params.id);
        
        if (!comment.user_id || !comment.product_id || !comment.title || !comment.body || !comment.valoration) {
            res.sendStatus(400).send({error: true,  message: 'No data send'});
        } else if (comment.body.length > 50 || comment.body.length > 255) {
            res.sendStatus(400).send({error: true,  message: 'The data sending surprass the limit of character of the body or title'});
        } else if (comment.title.length < 5 || comment.body.length < 10) {
            res.sendStatus(400).send({error: true,  message: 'The data sending has less characters the minimun limit of character of the body or title'});
        } else {
            Comments.addComment(comment, (err, data) => {
                if(err) {
                    res.send(err);
                }
                
                res.send({
                    ok: true,
                    msg: 'Comentario insertado'
                });
            });
        }
    })

};

exports.getCommentsOfAProduct = function(req, res) {
    Comments.getCommentsOfAProduct(req.params.id, (err, comments) => {
        if(err) {
            res.send(err);
        }
        
        res.json(comments);
    });
};