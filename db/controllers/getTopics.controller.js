const { findAllTopics } = require("../models/getTopics.model")

exports.getAllTopics = (req, res) => {
    findAllTopics().then( (topics) => {
        res.status(200).send({ topics });
    })
}