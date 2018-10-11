/* Requires Mongoose Schema */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

/* Creates a schema */
var userSchema = new Schema({
    username:       {type: String, required: true, index: true},
    admin:          {type: Boolean, default: true},
    email:          {type: String, required: true},
    password:       {type: String, required: true},
    createdAt:      {type: Date, default: Date.now},
    updatedAt:      {type: Date, default: Date.now}
});

/* Pre hook */
userSchema.pre('save', function(next){
  if (!this.createdAt) {
      this.createdAt = new Date();
  }
  next();
});

userSchema.plugin(uniqueValidator);

/* Creates a model */
var userModel = mongoose.model('User', userSchema);

/* Export model */
module.exports = userModel;

