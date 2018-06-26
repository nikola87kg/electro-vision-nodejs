// Dependencies
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var fs = require("fs-extra"); // file system
var ncp = require("ncp").ncp; // copy files
const multer = require("multer"); // image uplaoder

// Model
var Product = require("../models/productModel");
var Group = require("../models/groupModel");
var Brand = require("../models/brandModel");

/*************************** IMAGE UPLOAD ***************************/

// destination and filename
var storeFile = multer.diskStorage({
    destination: function(req, file, callback) {
        let folderDest =
            "./dist/electro-vision/assets/uploads/products/" +
            req.params.id +
            "/";
        if (!fs.existsSync(folderDest)) {
            fs.mkdir(folderDest, error => {
                console.log(error);
            });
        }
        callback(null, folderDest);
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

// upload single file
var uploadFile = multer({ storage: storeFile }).single("file");

// backup
ncp.limit = 16;
var originalFolder = "./dist/electro-vision/assets/uploads";
var backupFolder = "./backup";

// post image
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
            title: "Bravo! Slika proizvoda je uspešno snimljena u bazu",
            success: 1,
            path: req.file.path,
            image: req.file.originalname,
            uploadName: req.file.filename
        });
    });
});

/*************************** 1. POST ***************************/

router.post("/", function(req, res, next) {
    // create instance
    var product = new Product({
        name: req.body.name,
        description: req.body.description,
        slug: req.body.slug,
        group: req.body.group,
        category: req.body.category,
        brand: req.body.brand,
        image: "./assets/uploads/products/default.jpg"
    });
    // save to DB
    product.save(function(err, data) {
        if (err) {
            return res.status(500).json({
                title: "Greška! Proizvod nije snimljen u bazu",
                success: 0,
                error: err
            });
        }
        res.status(201).json({
            title: "Proizvod " + data.name + " je uspešno snimljen u bazu",
            success: 1,
            data: data
        });
    });
});

/*************************** 2. UPDATE ***************************/

router.put("/:id", function(req, res, next) {
    // image name check
    const imageName = req.body.image;
    let fullImage = "";
    if (imageName.split("/").length > 1) {
        fullImage = imageName;
    } else {
        fullImage =
            "./assets/uploads/products/" + req.params.id + "/" + imageName;
    }
    // find document by ID
    Product.findOneAndUpdate(
        // ID match
        { _id: req.params.id },
        // update product
        {
            $set: {
                name: req.body.name,
                slug: req.body.slug,
                category: req.body.category,
                brand: req.body.brand,
                group: req.body.group,
                description: req.body.description,
                image: fullImage
            }
        },
        /* callback */
        function(err, data) {
            if (err) {
                return res.status(500).json({
                    title: "Greška! Proizvod nije snimljen u bazu",
                    error: err
                });
            }
            res.status(201).json({
                title: "Proizvod " + data.name + " je uspešno ažuriran",
                id: data.id,
                success: 1
            });
        }
    );
});

/*************************** 3.GET  ***************************/

// 3. GET BY SLUG
router.get("/:slug", function(req, res, next) {

    /* Query Builder */
    Product.findOne({ slug: req.params.slug })
        .populate("group", ["name", "slug"])
        .populate("category", ["name", "slug"])
        .populate("brand", ["name", "slug"])
        .exec(function(error, data) {
            if (error) {
                return res.status(500).json({
                    title: "Greška! Niste učitali proizvod iz baze",
                    error: err
                });
            }
            res.status(200).json({
                message: "Bravo! Proizvod je uspešno učitan",
                object: data
            });
        });
});

// 3. GET ALL
router.get("/", function(req, res, next) {
    // Query
    const query = Product.find();
    // Populate and exec
    query
        .populate("group", ["_id", "name"])
        .populate("category", ["_id", "name"])
        .populate("brand", ["_id", "name"])
        .exec(function(err, productList) {
            if (err) {
                return res.status(500).json({
                    title: "Greška! Niste dobili željeni proizvod iz baze",
                    error: err
                });
            }
            res.status(200).json({
                message: "Bravo! Proizvod je uspešno učitan",
                object: productList
            });
        });
});

/*************************** 4. DELETE ***************************/

router.delete("/:id", function(req, res, next) {
    Product.findOneAndRemove(
        /* id match */
        { _id: req.params.id },
        /* callback */
        function(err, data) {
            /* error */
            if (err) {
                return res.status(500).json({
                    title: "Greška! Proizvod nije izbrisan iz baze",
                    success: 0,
                    error: err
                });
            }
            /* remove image folder */
            let folderDest =
                "./dist/electro-vision/assets/uploads/groups/" +
                req.params.id +
                "/";
            if (fs.existsSync(folderDest)) {
                fs.remove(folderDest).then(console.log("deleted Folder"));
            }
            /* send JSON */
            res.status(201).json({
                title: "Proizvod " + data.name + " je uspešno izbrisan",
                success: 1,
                data: data
            });
        }
    );
});

module.exports = router;
