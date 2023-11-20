const { findArticleById } = require("../models/getArticleById.model");

exports.getArticleById = (req, res) => {
    const id = req.params.article_id;
    findArticleById(id).then( (article) => {
        res.status(200).send({article});
    })
}