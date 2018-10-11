/* Requires Mongoose Schema */
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

/* Creates a schema */
var groupSchema = new Schema({
    name:           {type: String, required: true},
    description:    {type: String },
    slug:           {type: String, required: true},
    image:          {type: String },
    category:       {type: Schema.Types.ObjectId, ref: 'Category'},
    createdAt:      {type: Date, default: Date.now},
    updatedAt:      {type: Date, default: Date.now}
});

/* Pre hook */
groupSchema.pre('save', function(next){
  if (!this.createdAt) {
      this.createdAt = new Date();
  }
  next();
});

groupSchema.plugin(uniqueValidator);

/* Creates a model */
const groupModel = mongoose.model('Group', groupSchema);

/* Export model */
module.exports = groupModel;
