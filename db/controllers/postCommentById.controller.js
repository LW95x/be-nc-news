const { sendCommentById } = require("../models/postCommentById.model");

exports.postCommentById = (req, res, next) => {
  const id = req.params.article_id;
  const newComment = req.body;

  sendCommentById(newComment, id)
    .then((comment) => {
      res.status(201).send(comment);
    })
    .catch((err) => {
      next(err);
    });
};
