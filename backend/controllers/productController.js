var fs = require("fs-extra"); // file system
var ncp = require("ncp").ncp; // copy files
const multer = require("multer"); // image uplaoder

// Model
var Product = require("../models/productModel");

/* UPLOAD IMAGE */
exports.storeProductImage = function(req, res) {
    res.status(200).json({
        image: req.file.originalname
    });
}

/* CREATE NEW */
exports.createProduct = function(req, res, next) {
    var productNew = new Product({
        name: req.body.name,
        vip: req.body.vip,
        description: req.body.description,
        slug: req.body.slug,
        group: req.body.group,
        category: req.body.category,
        brand: req.body.brand,
        image: "./assets/uploads/ev.jpeg"
    });
    productNew.save()
        .then( product => {
            res.status(201).json({ object: product });
        })
        .catch( error => {
            res.status(500).json({ object: error });
        })
}

/* GET ALL */
exports.getAllProducts = (req, res, next) => {
    Product.find()
        .populate("group", ["_id", "name"])
        .populate("category", ["_id", "name"])
        .populate("brand", ["_id", "name"])
        .then( productList => {
            if(productList) {
                res.status(200).json({ object: productList })
            } else {
                res.status(404).json({ object: { error: 'no product list found' } });
            }
        })
        .catch( error => {
            res.status(500).json({ object: error });
        });
}

/* GET BY SLUG */
exports.getOneProduct = function(req, res, next) {
    Product.findOne({ slug: req.params.slug })
        .populate("group", ["name", "slug"])
        .populate("category", ["name", "slug"])
        .populate("brand", ["name", "slug"])
        .then( product => {
            if(product) {
                res.status(200).json({ object: product })
            } else {
                res.status(404).json();
            }
        })
        .catch( error => {
            res.status(500).json({ object: error });
        })
}

/* UPDATE ONE */
exports.updateProduct = function(req, res, next) {
    const url = req.protocol + "://" + req.get("host");

    let imagePath = req.body.image;
    if(req.body.image.split('/').length < 2) {
        imagePath = url + "/uploads/" +  req.body.image;
    }
    var productUpdated = {
        name: req.body.name,
        vip: req.body.vip,
        slug: req.body.slug,
        category: req.body.category,
        brand: req.body.brand,
        group: req.body.group,
        description: req.body.description,
        image: imagePath
    };
    Product.findOneAndUpdate({ _id: req.params.id }, { $set: productUpdated})
        .then( product => {
            res.status(200).json({ object: product })
        })
        .catch( error => {
            res.status(500).json({ object: error });
        })
}

/* DELETE ONE */
exports.deleteProduct = function(req, res, next) {
    Product.findOneAndRemove( {  _id: req.params.id } )
        .then( product => {
            // let folderDest = "./uploads/" + req.params.id + "/";
            // if (fs.existsSync(folderDest)) {
            //     fs.remove(folderDest).then( console.log('deleted Product') );
            // }
            res.status(200).json({ object: product })
        })
        .catch( error => {
            res.status(500).json({ object: error });
        });
}
