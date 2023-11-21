const { findArticleById } = require("../models/getArticleById.model");

exports.getArticleById = (req, res, next) => {
    const id = req.params.article_id;
    findArticleById(id).then( (article) => {
        res.status(200).send({article})       
    })
    .catch( (err) => {
        next(err)
    })
}