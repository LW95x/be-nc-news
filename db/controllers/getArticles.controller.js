const { findArticles, checkTopicExists } = require("../models/getArticles.model");

exports.getArticles = (req, res, next) => {
  const topic = req.query.topic;

  const topicPromises = [findArticles(topic)]

  if (topic) {
    topicPromises.push(checkTopicExists(topic));
  }

  Promise.all(topicPromises)
  .then( (resolvedPromises) => {

    const articles = resolvedPromises[0];
    res.status(200).send({articles});
  })
  .catch((err) => {
    next(err);
  })
}
