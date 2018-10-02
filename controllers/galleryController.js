// Model
var Gallery = require("../models/galleryModel");

/* UPLOAD IMAGE */
exports.storeGalleryImage = function (req, res) {
    res.status(200).json({
        image: req.file.originalname
    });
}

/* CREATE NEW */
exports.createGallery = function (req, res, next) {
    var galleryNew = new Gallery({
        name: req.body.name,
        description: req.body.description,
        gallery: req.body.gallery,
        imagePath: "./assets/logo/EV.svg"
    });
    galleryNew.save()
        .then(gallery => {
            res.status(201).json({
                object: gallery
            });
        })
        .catch(error => {
            res.status(500).json({
                object: error
            });
        })
}

/* GET ALL */
exports.getAllGalleries = (req, res, next) => {
    Gallery.find()
        .then(galleryList => {
            if (galleryList) {
                res.status(200).json({
                    object: galleryList
                })
            } else {
                res.status(404).json();
            }
        })
        .catch(error => {
            res.status(500).json({
                object: error
            });
        });
}

/* UPDATE ONE */
exports.updateGallery = function (req, res, next) {
    const url = req.protocol + "://" + req.get("host");

    let imagePath = req.body.imagePath;
    if (req.body.imagePath.split('/').length < 2) {
        imagePath = url + "/uploads/" + req.body.imagePath;
    }
    var galleryUpdated = {
        name: req.body.name,
        description: req.body.description,
        gallery: req.body.gallery,
        imagePath: imagePath
    };
    Gallery.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: galleryUpdated
        })
        .then(gallery => {
            res.status(200).json({
                object: gallery
            })
        })
        .catch(error => {
            res.status(500).json({
                object: error
            });
        })
}

/* DELETE ONE */
exports.deleteGallery = function (req, res, next) {
    Gallery.findOneAndRemove({
            _id: req.params.id
        })
        .then(gallery => {
            // let folderDest = "./dist/electro-vision/assets/uploads/gallery/" + req.params.id + "/";
            // if (fs.existsSync(folderDest)) {
            //     fs.remove(folderDest).then( console.log('deleted gallery') );
            // }
            res.status(200).json({
                object: gallery
            })
        })
        .catch(error => {
            res.status(500).json({
                object: error
            });
        });
}
