const { findCommentsById } = require("../models/getCommentsById.model");

exports.getCommentsById = (req, res, next) => {
  const id = req.params.article_id;
  findCommentsById(id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};
