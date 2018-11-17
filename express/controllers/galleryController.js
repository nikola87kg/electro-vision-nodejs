// Model
var Gallery = require("../models/galleryModel");

/* UPLOAD IMAGE */
exports.storeGalleryImage = function (req, res) {
    /* Send response with image name */
    res.status(200).json({
        image: req.file.originalname
    });
}

/* CREATE NEW */
exports.createGallery = async (req, res, next) => {

    try {
        /* Create gallery instance */
        const galleryNew = new Gallery({
            name: req.body.name,
            description: req.body.description,
            gallery: req.body.gallery,
            imagePath: "./assets/logo/EV.svg"
        });

        /* Save gallery to DB */
        const savedGallery = await galleryNew.save()

        /* Send response with gallery object */
        res.status(201).json( savedGallery );

    } catch(e) {
        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during creating gallery --> ', e,'\x1b[0m');
    }
}

/* GET ALL */
exports.getAllGalleries = async (req, res, next) => {

    try {
        /* Query to DB - GET gallery list */
        const galleryList = await Gallery.find();
        if(galleryList) {
            /* Send response with gallery list object */
            res.status(200).json( galleryList )

        } else {
            /* Send error - no list in DB */
            res.status(404).json();
            console.error("\x1b[41m", 'No gallery list found ','\x1b[0m');
        }

    } catch(e) {
        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during getting all galleries --> ', e,'\x1b[0m');
    }
}

/* UPDATE ONE */
exports.updateGallery = async (req, res, next) => {
    try {
        /* Get URL from request */
        const url = req.protocol + "://" + req.get("host");

        /* Handling image path */
        let imagePath = req.body.imagePath;
        if(req.body.imagePath.split('/').length < 2) {
            imagePath = url + "/uploads/" +  req.body.imagePath;
        }
        /* Create a gallery instance */
        const galleryUpdated = {
            name: req.body.name,
            description: req.body.description,
            gallery: req.body.gallery,
            imagePath: imagePath
        };

        /* Query to DB - PUT gallery */
        const updatedGallery = await Gallery.findOneAndUpdate({ _id: req.params.id }, { $set: galleryUpdated})

        /* Send response with updated gallery object */
        res.status(200).json( updatedGallery )

    } catch(e) {

        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during updating a gallery --> ', e,'\x1b[0m');
    }
}

/* DELETE ONE */
exports.deleteGallery = async (req, res, next) => {

    try {
        /* Query to DB - DELETE gallery */
        const deletedGallery = await Gallery.findOneAndDelete( {  _id: req.params.id } );

        /* Send response with updated gallery object */
        res.status(200).json( deletedGallery )
    } catch(e) {

        /* Send response with error object */
        res.status(500).json(e);
        console.error("\x1b[41m", 'Error during deleting a gallery --> ', e,'\x1b[0m');
    }
}
