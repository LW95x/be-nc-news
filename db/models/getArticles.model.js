const db = require("../connection");

exports.findArticles = (topic) => {
  let topicQuery = `SELECT 
    a.article_id, 
    a.title, 
    a.topic, 
    a.author, 
    a.created_at, 
    a.votes, 
    a.article_img_url, 
    COUNT(c.comment_id) AS comment_count 
    FROM articles a
    LEFT JOIN comments c ON a.article_id = c.article_id`;

  let parameters = [];

  if (topic) {
    topicQuery += ` WHERE a.topic = $1`;
    parameters.push(topic);
  }

  topicQuery += ` GROUP BY a.article_id, a.title, a.topic, a.author, a.created_at, a.votes, a.article_img_url
    ORDER BY a.created_at DESC`;

  return db.query(topicQuery, parameters).then(({ rows }) => {
    return rows;
  });
};

exports.checkTopicExists = (topic) => {
  return db
    .query(`SELECT * FROM topics WHERE slug = $1`, [topic])
    .then(({ rows }) => {
      if (!rows.length) {
        return Promise.reject({
          status: 404,
          msg: "That topic does not exist",
        });
      }
      return rows;
    });
};
