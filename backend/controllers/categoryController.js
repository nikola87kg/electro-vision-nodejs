var fs = require("fs-extra"); // file system
var ncp = require("ncp").ncp; // copy files
const multer = require("multer"); // image uplaoder

// Model
var Category = require("../models/categoryModel");

/* UPLOAD IMAGE */
exports.storeCategoryImage = function(req, res) {
    /* storage settings */
    var storeFile = multer.diskStorage({
        destination: function(req, file, callback) {
            let folderDest =
                "./dist/electro-vision/assets/uploads/categories/" + req.params.id + "/";
                if (!fs.existsSync(folderDest)) {
                    fs.mkdir(folderDest, (error) => { console.log(error) });
                }
                callback(null, folderDest);
        },
        filename: function(req, file, callback) {
            callback(null, file.originalname);
        }
    });
    /* upload settings */
    var uploadFile = multer({ storage: storeFile }).single("file");
    /* backup settings */
    ncp.limit = 16;
    var originalFolder = './dist/electro-vision/assets/uploads';
    var backupFolder = './backup';
    /* upload image */
    uploadFile(req, res, function(err) {
        if (err) {
            return res.status(501).json({ error: err });
        }
        ncp(originalFolder, backupFolder, function(err) {
            if (err) {
                return console.error(err);
            }
        });
        res.status(200).json({
            path: req.file.path,
            image: req.file.originalname,
            uploadName: req.file.filename
        });
    });
}

/* CREATE NEW */
exports.createCategory = function(req, res, next) {
    var categoryNew = new Category({
        name: req.body.name,
        description: req.body.description,
        slug: req.body.slug,
        image: "./assets/uploads/categories/default.jpg"
    });
    categoryNew.save()
        .then( category => {
            res.status(201).json({ object: category });
        })
        .catch( error => {
            res.status(500).json({ object: error });
        })
}

/* GET ALL */
exports.getAllCategories = (req, res, next) => {
    Category.find()
        .then( categoryList => {
            if(categoryList) {
                res.status(200).json({ object: categoryList })
            } else {
                res.status(404).json({ object: { error: 'no category list found' } });
            }
        })
        .catch( error => {
            res.status(500).json({ object: error });
        });
}

/* GET BY SLUG */
exports.getOneCategory = function(req, res, next) {
    Category.findOne({ slug: req.params.slug })
        .then( category => {
            if(category) {
                res.status(200).json({ object: category })
            } else {
                res.status(404).json();
            }
        })
        .catch( error => {
            res.status(500).json({ object: error });
        })
}

/* UPDATE ONE */
exports.updateCategory = function(req, res, next) {
    let imagePath =  req.body.image;
    if (req.body.image.split( '/' ).length < 2) {
        imagePath = "./assets/uploads/categories/" + req.params.id +  "/" +  req.body.image;
    };
    var categoryUpdated = ({
        name: req.body.name,
        slug: req.body.slug,
        description: req.body.description,
        image: imagePath
    });
    Category.findOneAndUpdate({ _id: req.params.id }, { $set: categoryUpdated})
        .then( category => {
            res.status(200).json({ object: category })
        })
        .catch( error => {
            res.status(500).json({ object: error });
        })
}

/* DELETE ONE */
exports.deleteCategory = function(req, res, next) {
    Category.findOneAndRemove( {  _id: req.params.id } )
        .then( category => {
            let folderDest = "./dist/electro-vision/assets/uploads/categories/" + req.params.id + "/";
            if (fs.existsSync(folderDest)) {
                fs.remove(folderDest).then( console.log('deleted Category') );
            }
            res.status(200).json({ object: category })
        })
        .catch( error => {
            res.status(500).json({ object: error });
        });
}
