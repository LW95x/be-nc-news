const db = require("../connection");

exports.findArticleById = (id) => {
    return db.query(`SELECT * FROM articles WHERE article_id = ${id}`).then(({rows}) => {
        return rows;
    })
}