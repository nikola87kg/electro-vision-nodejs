
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* Creates a schema */
var gallerySchema = new Schema({
    name:           {type: String, required: true, trim: true},
    description:    {type: String, trim: true, default: 'Ova slika nema opis'},
    imagePath:      {type: String },
    createdAt:      {type: Date, default: Date.now},
    updatedAt:      {type: Date, default: Date.now}
});

/* Pre Hook */
gallerySchema.pre('save', function(next){
  if (!this.createdAt) {
      this.createdAt = new Date();
  }
  next();
});

/* Creates a model */
const GalleryModel = mongoose.model('Gallery', gallerySchema);


/* Export */
module.exports = GalleryModel;
