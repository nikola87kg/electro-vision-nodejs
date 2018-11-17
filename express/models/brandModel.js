
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

/* Creates a schema */
var brandSchema = new Schema({
    name:           {type: String, required: true, trim: true, unique: true},
    description:    {type: String, trim: true, default: 'Ovaj brend nema opis'},
    slug:           {type: String, required: true, unique: true, trim: true},
    image:          {type: String },
    vip:            {type: Boolean, default: false}
}, {timestamps: true});

brandSchema.plugin(uniqueValidator);

/* Creates a model */
const BrandModel = mongoose.model('Brand', brandSchema);

/* Export */
module.exports = BrandModel;
