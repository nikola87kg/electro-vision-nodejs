/* Requires Mongoose Schema */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

/* Creates a schema */
var userSchema = new Schema({
    username:       {type: String, required: true, unique: true},
    admin:          {type: Boolean, default: true},
    email:          {type: String, required: true, unique: true},
    password:       {type: String, required: true}
}, {timestamps: true});

userSchema.plugin(uniqueValidator);

/* Creates a model */
var userModel = mongoose.model('User', userSchema);

/* Export model */
module.exports = userModel;

