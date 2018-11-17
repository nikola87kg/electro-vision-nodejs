
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* Creates a schema */
var gallerySchema = new Schema({
    name:           {type: String, required: true, trim: true},
    description:    {type: String, trim: true, default: 'Ova slika nema opis'},
    gallery:        {type: String, trim: true},
    imagePath:      {type: String }
}, {timestamps: true});

/* Creates a model */
const GalleryModel = mongoose.model('Gallery', gallerySchema);


/* Export */
module.exports = GalleryModel;
