/* Requires Mongoose Schema */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

/* Creates a schema */
var orderSchema = new Schema({
    name:       {type: String, required: true},
    phone:      {type: String, default: false},
    email:      {type: String, required: true},
    orderList:  {type: Array, required: true},
    question:   {type: String, },
}, {timestamps: true});

orderSchema.plugin(uniqueValidator);

/* Creates a model */
var orderModel = mongoose.model('Order', orderSchema);

/* Export model */
module.exports = orderModel;

