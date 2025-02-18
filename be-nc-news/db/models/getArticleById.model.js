const db = require("../connection");

exports.findArticleById = (id) => {
  return db
    .query(
      `SELECT 
    a.article_id, 
    a.title, 
    a.topic,
    a.body,
    a.author, 
    a.created_at, 
    a.votes, 
    a.article_img_url, 
    COUNT(c.comment_id) AS comment_count 
    FROM articles a
    LEFT JOIN comments c ON a.article_id = c.article_id
    WHERE a.article_id = $1
    GROUP BY a.article_id, a.title, a.topic, a.author, a.created_at, a.votes, a.article_img_url`,
      [id]
    )
    .then(({ rows }) => {
      const article = rows[0];

      if (!article) {
        return Promise.reject({
          status: 404,
          msg: "that ID does not exist",
        });
      }

      return rows;
    });
};
