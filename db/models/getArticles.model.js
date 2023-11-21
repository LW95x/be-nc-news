const db = require("../connection");

exports.findArticles = () => {
    return db.query(`SELECT article_id, title, topic, author, created_at, votes, article_img_url, COUNT(body) AS comment_count FROM articles 
    GROUP BY article_id, title, topic, author, created_at, votes, article_img_url
    ORDER BY created_at DESC`).then(({rows}) => {
        return rows;
    })
}