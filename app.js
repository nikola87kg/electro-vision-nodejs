const express = require('express');
const path = require('path');
const brandRoute = require('./express/routes/brandRoute');
const categoryRoute = require('./express/routes/categoryRoute');
const orderRoute = require('./express/routes/orderRoute');
const groupRoute = require('./express/routes/groupRoute');
const productRoute = require('./express/routes/productRoute');
const slideRoute = require('./express/routes/slideRoute');
const galleryRoute = require('./express/routes/galleryRoute');
const pricelistRoute = require('./express/routes/pricelistRoute');
const authRoute = require('./express/routes/authRoute');

/* CREATE EXPRESS APP */
const app = express();

/* STATIC FILES ACCESS */
app.use('/uploads', express.static(path.join(__dirname, 'uploads' )));
app.use("/angular/assets", express.static(path.join(__dirname, 'angular', 'assets' )));
app.use("/angular", express.static(path.join(__dirname, 'angular' )));
app.use("/", express.static(path.join(__dirname, 'angular' )));


/* PARSE REQUEST BODY */
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* CORS */
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods','POST, GET, PATCH, PUT, DELETE, OPTIONS' );
    next();
});

/* ROUTING */
app.use('/api/auth',        authRoute);
app.use('/api/brands',      brandRoute);
app.use('/api/categories',  categoryRoute);
app.use('/api/gallery',     galleryRoute);
app.use('/api/groups',      groupRoute);
app.use('/api/orders',      orderRoute);
app.use('/api/pricelist',   pricelistRoute);
app.use('/api/products',    productRoute);
app.use('/api/slides',      slideRoute);
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'angular', 'index.html'));
});

/* EXPORT EXPRESS APP */
module.exports = app;
