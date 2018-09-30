/* Reference models */
var Group = require('./groupModel');
var Category = require('./categoryModel');
var Brand = require('./brandModel');

/* Requires Mongoose Schema */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* Creates a schema */
var productSchema = new Schema({
    name:           {type: String, required: true, index: true},
    vip:            {type: Boolean, default: false},
    description:    {type: String},
    slug:           {type: String, required: true, trim: true},
    category:       {type: Schema.Types.ObjectId, ref: 'Category', required: true},
    group:          {type: Schema.Types.ObjectId, ref: 'Group', required: true},
    brand:          {type: Schema.Types.ObjectId, ref: 'Brand', required: true},
    image:          {type: String},
    createdAt:      {type: Date, default: Date.now},
    updatedAt:      {type: Date, default: Date.now}
});

/* Pre hook */
productSchema.pre('save', function(next){
  if (!this.createdAt) {
      this.createdAt = new Date();
  }
  next();
});

/* Creates a model */
var productModel = mongoose.model('Product', productSchema);

/* Export model */
module.exports = productModel;

