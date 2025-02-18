const db = require("../connection");

exports.removeCommentById = async (id) => {
  return checkCommentId(id).then((comment) => {
    if (!comment) {
      return Promise.reject({
        status: 404,
        msg: "that comment ID does not exist",
      });
    }

    return db
      .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`, [id])
      .then(({ rows }) => {
        const comment = rows[0];

        return comment;
      });
  });
};

function checkCommentId(id) {
  return db
    .query(`SELECT * FROM comments WHERE comment_id = $1`, [id])
    .then(({ rows }) => {
      return rows.length > 0;
    });
}
