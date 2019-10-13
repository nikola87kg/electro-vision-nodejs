/* Requires Mongoose Schema */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

/* Creates a schema */
var slideSchema = new Schema({
    image:       {type: String},
    title:      {type: String},
    subtitle:      {type: String},
}, {timestamps: true},);

slideSchema.plugin(uniqueValidator);

/* Creates a model */
var slideModel = mongoose.model('Slide', slideSchema);

/* Export model */
module.exports = slideModel;

