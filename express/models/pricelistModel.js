var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* Creates a schema */
var pricelistSchema = new Schema(
	{
		name: { type: String, required: true, trim: true, unique: true },
		priceGroup: { type: Object },
		price: { type: String, required: true }
	},
	{ timestamps: true }
);

/* Creates a model */
const PricelistModel = mongoose.model('Pricelist', pricelistSchema);

/* Export */
module.exports = PricelistModel;
