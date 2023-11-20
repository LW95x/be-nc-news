const { findAllTopics } = require("../models/getTopics.model")

exports.getAllTopics = (req, res) => {
    findAllTopics().then( (data) => {
        res.status(200).send(data);
    })
}