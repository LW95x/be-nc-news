const db = require("../connection");
const fs = require('fs/promises');

exports.findApi = () => {
    return fs.readFile(`${__dirname}/../../endpoints.json`, 'utf-8').then( (data) => {
        const parsedEndpoints = JSON.parse(data)
        return parsedEndpoints;
    })
}
