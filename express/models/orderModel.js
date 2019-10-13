/* Requires Mongoose Schema */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

/* Creates a schema */
var orderSchema = new Schema({
    orderList:  {type: Array, required: true},
    name:       {type: String, required: true},
    phone:      {type: String},
    email:      {type: String},
    address:    {type: String},
    question:   {type: String, },
}, {timestamps: true});

orderSchema.plugin(uniqueValidator);

/* Creates a model */
var orderModel = mongoose.model('Order', orderSchema);

/* Export model */
module.exports = orderModel;

