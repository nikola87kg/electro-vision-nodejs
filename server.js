/* CONFIG */
const env = process.env.NODE_ENV || 'development';
const config = require('./config/server-config')[env];

/* EXPRESS */
const express = require('express');
const app = express();

/*  HTTP */
const http = require('http');
const server = http.createServer(app);

server.listen(config.server.port, () =>
  console.log('API running on localhost:' + config.server.port )
);

/* DATABASE */
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const url = 'mongodb://'  + config.db.host + ":" + config.db.port + "/" + config.db.name;
const urlOptions = config.db.options;
mongoose.connect(url, urlOptions);

/* FRONTEND DIST */
const path = require('path');
app.use(express.static(path.join(__dirname, 'dist')));

/* MIDDLEWARE */
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true } ) );

const logger = require('morgan');
app.use(logger('dev'));

const errorHandler = require('errorhandler');
app.use(errorHandler());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, PUT, DELETE, OPTIONS');
  next();
});

/* API ROUTES */
const brandRoute = require('./backend/routes/brandRoute');
app.use('/api/brands', brandRoute);

const categoryRoute = require('./backend/routes/categoryRoute');
app.use('/api/categories', categoryRoute);

const groupRoute = require('./backend/routes/groupRoute');
app.use('/api/groups', groupRoute);

const productRoute = require('./backend/routes/productRoute');
app.use('/api/products', productRoute);

const apiDefault = require('./backend/routes/apiDefault');
app.use('/api', apiDefault);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});
