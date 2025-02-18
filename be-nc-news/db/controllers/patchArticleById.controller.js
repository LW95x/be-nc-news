const { editArticleById } = require("../models/patchArticleById.model");

exports.patchArticleById = (req, res, next) => {
  const id = req.params.article_id;
  const newVotes = req.body.inc_votes;

  editArticleById(newVotes, id)
    .then((article) => {
      res.status(200).send(article);
    })
    .catch((err) => {
      next(err);
    });
};
