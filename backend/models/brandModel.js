
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* Creates a schema */
var brandSchema = new Schema({
    name:           {type: String, required: true, trim: true},
    description:    {type: String, trim: true, default: 'Ovaj brend nema opis'},
    slug:           {type: String, required: true, index: true, trim: true},
    image:          {type: String },
    createdAt:      {type: Date, default: Date.now},
    updatedAt:      {type: Date, default: Date.now}
});

/* Pre Hook */
brandSchema.pre('save', function(next){
  if (!this.createdAt) {
      this.createdAt = new Date();
  }
  next();
});

/* Creates a model */
const BrandModel = mongoose.model('Brand', brandSchema);


/* Export */
module.exports = BrandModel;
