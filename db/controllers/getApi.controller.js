const { findApi } = require("../models/getApi.model")

exports.getApi = (req, res) => {
    findApi().then( (endpoints) => {
        res.status(200).send(endpoints);
    })
}