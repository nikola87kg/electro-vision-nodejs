
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* Creates a schema */
var pricelistSchema = new Schema({
    name:           {type: String, required: true, trim: true},
    description:    {type: String, trim: true, default: 'Ova stavka cenovnika nema opis'},
    price:          {type: String, required: true },
    createdAt:      {type: Date, default: Date.now},
    updatedAt:      {type: Date, default: Date.now}
});

/* Pre Hook */
pricelistSchema.pre('save', function(next){
  if (!this.createdAt) {
      this.createdAt = new Date();
  }
  next();
});

/* Creates a model */
const PricelistModel = mongoose.model('Pricelist', pricelistSchema);


/* Export */
module.exports = PricelistModel;
