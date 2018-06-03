// Dependencies
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var fs = require("fs-extra"); // file system
var ncp = require("ncp").ncp; // copy files
const multer = require("multer"); // image uplaoder
var colors = require('colors'); // colored console log

// Model
var Category = require("../models/categoryModel");

/** FILE UPLOAD */

var storeFile = multer.diskStorage({
    destination: function(req, file, callback) {
        let folderDest =
            "./dist/electro-vision/assets/uploads/categories/" + req.params.id + "/";
        if (!fs.existsSync(folderDest)) {
            fs.mkdir(folderDest, (error) => { console.log(error) });
        }
        callback(null, folderDest);
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

var uploadFile = multer({ storage: storeFile }).single("file");

/* backup */
ncp.limit = 16;
var originalFolder = './dist/electro-vision/assets/uploads';
var backupFolder = './backup';

/** UPLOAD IMAGE ROUTE */
router.post("/images/:id", function(req, res) {
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
            title: "Bravo! Slika kategorije je uspešno snimljena u bazu",
            success: 1,
            path: req.file.path,
            image: req.file.originalname,
            uploadName: req.file.filename
        });
    });
});

// 1. POST
router.post("/", function(req, res, next) {
    /* create */
    var category = new Category({
        name: req.body.name,
        description: req.body.description,
        slug: req.body.slug,
        image: "./assets/uploads/categories/default.jpg"
    });
    /* save */
    category.save(function(error, category) {
        if (error) {
            return res.status(500).json({
                title: "Greška! Kategorija nije snimljena u bazu",
                error: error
            });
        }
        if (!error) {
            res.status(201).json({
                title: "Bravo! Kategorija je uspešno snimljena u bazu",
                data: category
            });
        }
    });
});

// 2.GET BY SLUG
router.get("/:slug", function(req, res, next) {

    /* Query */
    Category.findOne({ slug: req.params.slug }).exec(callback);

    /* Callback */
    var callback = function(error, category) {
        if (error) {
            return res.status(500).json({
                title: "Greška! Niste dobili listu kategorije iz baze",
                error: error
            });
        }
        res.status(200).json({
            message: "Bravo! Kategorija je uspešno učitana",
            object: category
        });
    };

});

/* 2. UPDATE */
router.put("/:id", function(req, res, next) {
    const imageName = req.body.image;
    let fullImage = '';
    if (imageName.split( '/' ).length > 1) {
        fullImage = imageName;
    } else {
        fullImage = "./assets/uploads/categories/" + req.params.id +  "/" + imageName;
    };
    /* find document by ID */
    Category.findOneAndUpdate(
        /* ID match */
        { _id: req.params.id },
        /* update Category */
        {
            $set: {
                name: req.body.name,
                slug: req.body.slug,
                description: req.body.description,
                image: fullImage
            }
        },
        /* callback */
        function(err, data) {
            if (err) {
                return res.status(500).json({
                    title: "Greška! Kategorija nije snimljena u bazu",
                    success: 0,
                    error: err
                });
            }
            res.status(201).json({
                title: "Bravo! Kategorija je uspešno snimljena u bazu",
                id: data.id,
                success: 1
            });
        }
    );
});

// 2.GET ALL
router.get("/", function(req, res, next) {
    /* Query */
    const query = Category.find();
    /* Find categories in DB */
    query.exec(function(err, categoryList) {
        if (err) {
            return res.status(500).json({
                title: "Greška! Niste dobili kategoriju iz baze",
                error: err
            });
        }
        res.status(200).json({
            message: "Bravo! Kategorija je uspešno učitana",
            object: categoryList
        });
    });
});

/* 4. DELETE */
router.delete("/:id", function(req, res, next) {
    Category.findOneAndRemove(
        /* id match */
        { _id: req.params.id  },
        /* callback */
        function(err, data) {
            if (err) {
                return res.status(500).json({
                    title: "Greška! Kategorija nije izbrisana iz baze",
                    success: 0,
                    error: err
                });
            }
            /* remove image folder */
            let folderDest = "./dist/electro-vision/assets/uploads/categories/" + req.params.id + "/";
            if (fs.existsSync(folderDest)) {
                fs.remove(folderDest).then( console.log('deleted Folder') );
            }
            /* success */
            res.status(201).json({
                title: "Upravo ste izbrisali kategoriju iz baze",
                data: data
            });
        }
    );
});

module.exports = router;
