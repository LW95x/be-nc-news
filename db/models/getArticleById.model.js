const db = require("../connection");

exports.findArticleById = (id) => {
    return db.query(`SELECT * FROM articles WHERE article_id = $1;`, [id]).then(({rows}) => {
        const article = rows[0];

        if (!article) {
            return Promise.reject({
                status: 404,
                msg: 'that ID does not exist'
            })
        }
        return rows;
    })
}