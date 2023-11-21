const { findArticles } = require("../models/getArticles.model")

exports.getArticles = (req, res, next) => {
    findArticles().then ( (articles) => {
        res.status(200).send({articles})
    })
    .catch( (err) => {
        next(err)
    })
}