var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    name:           {type: String, required: true},
    description:    {type: String },
    slug:           {type: String, required: true},
    image:          {type: String },
    createdAt:      {type: Date, default: Date.now},
    updatedAt:      {type: Date, default: Date.now}
});

/* Pre Hook */
categorySchema.pre('save', function(next){
  if (!this.createdAt) {
      this.createdAt = new Date();
  }
  next();
});

categorySchema.plugin(uniqueValidator);

/* Creates a model */
const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;
