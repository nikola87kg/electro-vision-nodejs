var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    name:           {type: String, required: true},
    description:    {type: String },
    slug:           {type: String, required: true},
    createdAt:      {type: Date, default: Date.now},
    updatedAt:      {type: Date, default: Date.now}
});

/* checking createdAt */
categorySchema.pre('save', function(next){
  if (!this.createdAt) {
      this.createdAt = new Date();
  }
  next();
});

module.exports = mongoose.model('Category', categorySchema);
