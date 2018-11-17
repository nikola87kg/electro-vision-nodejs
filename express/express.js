const express = require("express");
const path = require("path");
const brandRoute = require("./routes/brandRoute");
const categoryRoute = require("./routes/categoryRoute");
const groupRoute = require("./routes/groupRoute");
const productRoute = require("./routes/productRoute");
const galleryRoute = require("./routes/galleryRoute");
const pricelistRoute = require("./routes/pricelistRoute");
const authRoute = require("./routes/authRoute");

/* CREATE EXPRESS APP */
const app = express();

/* STATIC FILES ACCESS */
app.use('*/uploads', express.static(path.join(__dirname, "..", "uploads" )));

/* PARSE REQUEST BODY */
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* CORS */
app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods","POST, GET, PATCH, PUT, DELETE, OPTIONS" );
    next();
});

/* ROUTING */
app.use("/api/auth",        authRoute);
app.use("/api/brands",      brandRoute);
app.use("/api/categories",  categoryRoute);
app.use("/api/gallery",     galleryRoute);
app.use("/api/groups",      groupRoute);
app.use("/api/pricelist",   pricelistRoute);
app.use("/api/products",    productRoute);

/* EXPORT EXPRESS APP */
module.exports = app;
