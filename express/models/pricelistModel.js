
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* Creates a schema */
var pricelistSchema = new Schema({
    name:           {type: String, required: true, trim: true, unique: true},
    description:    {type: String, trim: true, default: 'Ova stavka cenovnika nema opis'},
    price:          {type: String, required: true }
}, {timestamps: true});

/* Creates a model */
const PricelistModel = mongoose.model('Pricelist', pricelistSchema);


/* Export */
module.exports = PricelistModel;
