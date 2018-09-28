/* CONFIG */
const env = process.env.NODE_ENV || "development";
const config = require("./backend/config/server-config")[env];

/* EXPRESS */
const app = require("./backend/express");

/*  HTTP */
const http = require("http");
const server = http.createServer(app);

server.listen(config.server.port, () => {
    console.log("API running on " + config.server.host + ":" + config.server.port);
});

/* DATABASE */
var mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const url =
    "mongodb+srv://"
    + config.db.user + ":"
    + config.db.password + "@"
    + config.db.url + "/"
    + config.db.name;
mongoose.connect(url);
