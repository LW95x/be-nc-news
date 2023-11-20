const express = require("express");
const { getAllTopics } = require("./controllers/getTopics.controller");
const { getApi } = require("./controllers/getApi.controller");
const { getArticleById } = require("./controllers/getArticleById.controller")

const app = express();

app.use(express.json());

app.get("/api/topics", getAllTopics);

app.get("/api", getApi);

app.get("/api/articles/:article_id", getArticleById)

module.exports = app;
