/* Requires Mongoose Schema */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

/* Creates a schema */
var employmentSchema = new Schema({
    name:       {type: String, required: true},
    phone:      {type: String},
    email:      {type: String},
    school:     {type: String},
    text:       {type: String},
    experience: {type: String},
}, {timestamps: true});

employmentSchema.plugin(uniqueValidator);

/* Creates a model */
var employmentModel = mongoose.model('Employment', employmentSchema);

/* Export model */
module.exports = employmentModel;

