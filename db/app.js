const express = require("express");
const { getAllTopics } = require("./controllers/getTopics.controller");
const { getApi } = require("./controllers/getApi.controller");

const app = express();

app.use(express.json());

app.get("/api/topics", getAllTopics);

app.get("/api", getApi);

module.exports = app;
