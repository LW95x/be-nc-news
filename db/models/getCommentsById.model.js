const db = require("../connection");

exports.findCommentsById = (id) => {
  return db
    .query(
      `SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC `,
      [id]
    )
    .then(({ rows }) => {
      const comments = rows[0];

      if (!comments) {
        return Promise.reject({
          status: 404,
          msg: "that ID does not exist",
        });
      }
      return rows;
    });
};
