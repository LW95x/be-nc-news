const db = require("../connection");

exports.sendCommentById = (newComment, id) => {
  return checkArticleId(id).then((article) => {
    if (!article) {
      return Promise.reject({
        status: 404,
        msg: "that ID does not exist",
      });
    }

    const { username, body } = newComment;

    return db
      .query(
        `INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *;`,
        [id, username, body]
      )
      .then(({ rows }) => {
        const comment = rows[0];

        return comment;
      });
  });
};

function checkArticleId(id) {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [id])
    .then(({ rows }) => {
      return rows.length > 0;
    });
}
