const express = require("express");
const { getAllTopics } = require("./controllers/getTopics.controller");
const { getApi } = require("./controllers/getApi.controller");
const { getArticleById } = require("./controllers/getArticleById.controller");
const { getArticles } = require("./controllers/getArticles.controller");
const { getCommentsById } = require("./controllers/getCommentsById.controller");
const { postCommentById } = require("./controllers/postCommentById.controller");

const app = express();

app.use(express.json());

app.get("/api/topics", getAllTopics);

app.get("/api", getApi);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getCommentsById);

app.post("/api/articles/:article_id/comments", postCommentById)

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad request" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
});

module.exports = app;
