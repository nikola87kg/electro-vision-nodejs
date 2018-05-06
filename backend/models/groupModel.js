var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Category = require('./categoryModel');

var groupSchema = new Schema({
    name:           {type: String, required: true},
    description:    {type: String },
    slug:           {type: String, required: true},
    category:       {type: Schema.Types.ObjectId, ref: 'Category'},
    createdAt:      {type: Date, default: Date.now},
    updatedAt:      {type: Date, default: Date.now}
});

/* checking createdAt */
groupSchema.pre('save', function(next){
  if (!this.createdAt) {
      this.createdAt = new Date();
  }
  next();
});

module.exports = mongoose.model('Group', groupSchema);
