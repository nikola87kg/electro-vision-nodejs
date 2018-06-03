// Dependencies
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var fs = require("fs-extra"); // file system
var ncp = require("ncp").ncp; // copy files
const multer = require("multer"); // image uplaoder
var colors = require('colors'); // colored console log

// Model
var Brand = require("../models/brandModel");

// 0. IMAGE UPLOAD
var storeFile = multer.diskStorage({
    destination: function(req, file, callback) {
        let folderDest =
            "./dist/electro-vision/assets/uploads/brands/" + req.params.id + "/";
            if (!fs.existsSync(folderDest)) {
                fs.mkdir(folderDest, (error) => { console.log(error) });
            }
            callback(null, folderDest);
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname);
    }
});

var uploadFile = multer({ storage: storeFile }).single("file");

/* backup */
ncp.limit = 16;
var originalFolder = './dist/electro-vision/assets/uploads';
var backupFolder = './backup';

// -->  api/brands/images/:id
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
            title: "Slika brenda je uspešno snimljena u bazu",
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
    var brand = new Brand({
        name: req.body.name,
        description: req.body.description,
        slug: req.body.slug,
        image: "./assets/uploads/brands/default.jpg"
    });
    /* save */
    brand.save(function(error, brand) {
        if (error) {
            return res.status(500).json({
                title: "Greška! Brend nije snimljen u bazu",
                error: error
            });
        }
        if (!error) {
            return res.status(201).json({
                title: "Bravo! Brend " + data.name + " je uspešno snimljen u bazu",
                data: brand
            });
        }
    });
});

// 2. UPDATE
router.put("/:id", function(req, res, next) {
    const imageName = req.body.image;
    let fullImage = '';
    if (imageName.split( '/' ).length > 1) {
        fullImage = imageName;
    } else {
        fullImage = "./assets/uploads/brands/" + req.params.id +  "/" + imageName;
    };
    /* find document by ID */
    Brand.findOneAndUpdate(
        { _id: req.params.id },
        /* update brand */
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
                    title: "Greška! Brend nije snimljen u bazu",
                    success: 0,
                    error: err
                });
            }
            res.status(201).json({
                title: "Brend " + data.name + " je uspešno snimljen u bazu",
                id: data.id,
                success: 1
            });
        }
    );
});

// 3. GET BY SLUG
router.get("/:slug", function(req, res, next) {
    /* Query */
    const query = Brand.findOne({ slug: req.params.slug });
    /* Callback */
    query.exec(function(error, brand) {
        if (error) {
            return res.status(500).json({
                title: "Greška! Niste dobili listu brendova iz baze",
                error: error
            });
        }
        res.status(200).json({
            message: "Brendovi su uspešno učitani",
            object: brand
        });
    });
});

// 4. GET ALL
router.get("/", function(req, res, next) {
    /* Query */
    const query = Brand.find();
    /* Callback */
    query.exec(function(err, brandList) {
        if (err) {
            return res.status(500).json({
                title: "Greška! Niste dobili listu brendova iz baze",
                error: err
            });
        }
        res.status(200).json({
            message: "Brendovi su uspešno učitani",
            object: brandList
        });
    });
});

// 5. DELETE
router.delete("/:id", function(req, res, next) {
    Brand.findOneAndRemove(
        /* id match */
        {  _id: req.params.id },
        /* callback */
        function(err, data) {
            if (err) {
                return res.status(500).json({
                    title: "Greška! Brend nije izbrisan iz baze",
                    success: 0,
                    error: err
                });
            }
            /* remove image folder */
            let folderDest = "./dist/electro-vision/assets/uploads/brands/" + req.params.id + "/";
            if (fs.existsSync(folderDest)) {
                fs.remove(folderDest).then( console.log('deleted Folder') );
            }
            /* success */
            res.status(201).json({
                title: "Upravo ste izbrisali brend " + data.name + " iz baze",
                data: data
            });
        }
    );
});

module.exports = router;
