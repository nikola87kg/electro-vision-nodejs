/* CONFIG */
const env = process.env.NODE_ENV || "development";
const config = require("./config/server-config")[env];

/* EXPRESS */
const app = require("./express");

/*  HTTP */
const http = require("http");
const server = http.createServer(app);

server.listen(config.server.port, () => {
    console.log("API running on " + config.server.host + ":" + config.server.port);
});

/* DATABASE */
var mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const url ="mongodb+srv://Nikola:Fgo2XsVOFfNzw3id@electrovision-cluster-vludv.mongodb.net/production";
mongoose.connect(url, { retryWrites=true, useNewUrlParser: true });
