var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    name:           {type: String, required: true, unique: true},
    description:    {type: String },
    slug:           {type: String, required: true, unique: true},
    image:          {type: String }
}, {timestamps: true});

categorySchema.plugin(uniqueValidator);

/* Creates a model */
const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;
