/* EXPRESS */
const express = require("express");
const app = express();

/* FRONTEND DIST */
const path = require("path");
// app.use(express.static(path.join(__dirname, "dist", "electro-vision" )));
app.use('/uploads', express.static(path.join(__dirname, "../uploads" )));

/* MIDDLEWARE */
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const logger = require("morgan");
app.use(logger("dev"));

const errorHandler = require("errorhandler");
app.use(errorHandler());

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods","POST, GET, PATCH, PUT, DELETE, OPTIONS" );
    next();
});

/* API ROUTES */
const brandRoute = require("./routes/brandRoute");
app.use("/api/brands", brandRoute);

const categoryRoute = require("./routes/categoryRoute");
app.use("/api/categories", categoryRoute);

const groupRoute = require("./routes/groupRoute");
app.use("/api/groups", groupRoute);

const productRoute = require("./routes/productRoute");
app.use("/api/products", productRoute);

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "dist/electro-vision/index.html"));
// });

module.exports = app;
