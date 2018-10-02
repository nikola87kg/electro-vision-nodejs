// /* CONFIG */
const env = require('dotenv').config().parsed;

/* EXPRESS */
const app = require("./express");

/*  HTTP */
const http = require("http");
const server = http.createServer(app);

const port = env.ENV_PORT || "3000";
app.set("port", port);

server.listen(port, () => {
    console.log("API running on port: " + port);
});

/* DATABASE */
var mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const mongoose_url =
    "mongodb+srv://"
    + env.DB_USER
    + ":"
    + env.DB_PASS
    + "@"
    + env.DB_URL
    + "/"
    + env.DB_NAME;
mongoose.connect(mongoose_url, {
    retryWrites: true,
    useNewUrlParser: true
});
