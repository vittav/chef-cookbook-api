// Load mongoClient object
const mongoClient = require("mongodb").MongoClient;
// Connect to localhost db (standard port: 27017)
mongoClient.connect("mongodb://localhost", { useUnifiedTopology: true })
    .then(conn => global.conn = conn.db("workshoptdc"))
    .catch(err => console.log(err))

module.exports = {}