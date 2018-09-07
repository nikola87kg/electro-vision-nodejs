var fs = require("fs-extra"); // file system
var ncp = require("ncp").ncp; // copy files
const multer = require("multer"); // image uplaoder

// Model
var Pricelist = require("../models/PricelistModel");

/* CREATE NEW */
exports.createPricelist = function(req, res, next) {
    var pricelistNew = new Pricelist({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    });
    pricelistNew.save()
        .then( pricelist => {
            res.status(201).json({ object: pricelist });
        })
        .catch( error => {
            res.status(500).json({ object: error });
        })
}

/* GET ALL */
exports.getAllPricelists = (req, res, next) => {
    Pricelist.find()
        .then( pricelistList => {
            if(pricelistList) {
                res.status(200).json({ object: pricelistList })
            } else {
                res.status(404).json();
            }
        })
        .catch( error => {
            res.status(500).json({ object: error });
        });
}

/* UPDATE ONE */
exports.updatePricelist = function(req, res, next) {
    var pricelistUpdated = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    };
    Pricelist.findOneAndUpdate({ _id: req.params.id }, { $set: pricelistUpdated})
        .then( pricelist => {
            res.status(200).json({ object: pricelist })
        })
        .catch( error => {
            res.status(500).json({ object: error });
        })
}

/* DELETE ONE */
exports.deletePricelist = function(req, res, next) {
    Pricelist.findOneAndRemove( {  _id: req.params.id } )
        .then( pricelist => {
            // let folderDest = "./dist/electro-vision/assets/uploads/pricelist/" + req.params.id + "/";
            // if (fs.existsSync(folderDest)) {
            //     fs.remove(folderDest).then( console.log('deleted pricelist') );
            // }
            res.status(200).json({ object: pricelist })
        })
        .catch( error => {
            res.status(500).json({ object: error });
        });
}
