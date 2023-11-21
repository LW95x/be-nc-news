const db = require("../connection");

exports.findArticles = () => {
  return db
    .query(
      `SELECT 
    a.article_id, 
    a.title, topic, 
    a.author, 
    a.created_at, 
    a.votes, 
    a.article_img_url, 
    COUNT(c.comment_id) AS comment_count 
    FROM articles a
    LEFT JOIN comments c ON a.article_id = c.article_id
    GROUP BY a.article_id, a.title, a.topic, a.author, a.created_at, a.votes, a.article_img_url
    ORDER BY a.created_at DESC`
    )
    .then(({ rows }) => {
      return rows;
    });
};
