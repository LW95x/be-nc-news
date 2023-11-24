const { removeCommentById } = require("../models/deleteCommentById.model");

exports.deleteCommentById = (req, res, next) => {
    const id = req.params.comment_id;
    
    removeCommentById(id)
    .then( (comment) => {
        res.status(204).send(comment);
    })
    .catch((err) => {
        next(err);
    })
}