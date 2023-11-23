const db = require("../connection");

exports.editArticleById = (newVotes, id) => {
  return checkArticleId(id).then((article) => {
    if (!article) {
      return Promise.reject({
        status: 404,
        msg: "that ID does not exist",
      });
    }

    if (typeof newVotes !== "number") {
      return Promise.reject({
        status: 400,
        msg: "Bad request",
      });
    }

    return db
      .query(
        `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *`,
        [newVotes, id]
      )
      .then(({ rows }) => {
        const updatedVotes = rows[0];

        return updatedVotes;
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
