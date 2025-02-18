const { findUsers } = require("../models/getUsers.model");

exports.getUsers = (req, res) => {
  findUsers().then((users) => {
    res.status(200).send({ users });
  });
};
