/* CONFIG */
const env = process.env.NODE_ENV || "development";
const config = require("./backend/config/server-config")[env];

/* EXPRESS */
const express = require("express");
const app = require("./backend/express");

/*  HTTP */
const http = require("http");
const server = http.createServer(app);

server.listen(config.server.port, () => {
    console.log("API running on localhost:" + config.server.port);
});

/* DATABASE */
var mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const url =
    "mongodb://" + config.db.host + ":" + config.db.port + "/" + config.db.name;
const urlOptions = config.db.options;
mongoose.connect(url, urlOptions);
