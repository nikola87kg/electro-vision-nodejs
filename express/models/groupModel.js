/* Requires Mongoose Schema */
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

/* Creates a schema */
var groupSchema = new Schema({
    name:           {type: String, required: true, unique: true},
    description:    {type: String },
    slug:           {type: String, required: true, unique: true},
    image:          {type: String },
    category:       {type: Schema.Types.ObjectId, ref: 'Category'}
}, {timestamps: true});

groupSchema.plugin(uniqueValidator);

/* Creates a model */
const groupModel = mongoose.model('Group', groupSchema);

/* Export model */
module.exports = groupModel;
