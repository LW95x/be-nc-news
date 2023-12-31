const express = require("express");
const { getAllTopics } = require("./controllers/getTopics.controller");
const { getApi } = require("./controllers/getApi.controller");
const { getArticleById } = require("./controllers/getArticleById.controller");
const { getArticles } = require("./controllers/getArticles.controller");
const { getCommentsById } = require("./controllers/getCommentsById.controller");
const { postCommentById } = require("./controllers/postCommentById.controller");
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
} = require("./errors");
const {
  patchArticleById,
} = require("./controllers/patchArticleById.controller");
const {
  deleteCommentById,
} = require("./controllers/deleteCommentById.controller");
const { getUsers } = require("./controllers/getUsers.controller");
const cors = require ('cors');

const app = express();

app.use(cors());

app.use(express.json());

app.get("/api/topics", getAllTopics);

app.get("/api/users", getUsers);

app.get("/api", getApi);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getCommentsById);

app.post("/api/articles/:article_id/comments", postCommentById);

app.patch("/api/articles/:article_id", patchArticleById);

app.delete("/api/comments/:comment_id", deleteCommentById);

app.use(handleCustomErrors);

app.use(handlePsqlErrors);

app.use(handleServerErrors);

module.exports = app;
