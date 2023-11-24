const { findArticles } = require("../models/getArticles.model");

exports.getArticles = (req, res, next) => {
  const topic = Object.keys(req.query)[0];

  findArticles(topic)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};
