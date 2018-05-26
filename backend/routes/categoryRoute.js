// Dependencies
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

// Model
var Category = require("../models/categoryModel");

/** FILE UPLOAD */

const multer = require("multer");

var storeFile = multer.diskStorage({
    destination: function(req, file, cb) {
        let folderDest =
            "./dist/electro-vision/assets/uploads/categories/" +
            req.params.slug +
            "/"; //folder path
        fs.mkdir(folderDest, error => {
            console.log(error);
        }); // create folder
        cb(null, folderDest); // error , folder name
    },

    filename: function(req, file, cb) {
        cb(null, file.originalname); // error , file name
    }
});

var uploadFile = multer({ storage: storeFile }).single("file");

/** UPLOAD IMAGE ROUTE */
router.post("/images/:slug", function(req, res) {
    uploadFile(req, res, function(err) {
        if (err) {
            return res.status(501).json({ error: err });
        }
        res.status(200).json({
            title: "Bravo! Slika je uspešno snimljena u bazu",
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
        image: "./assets/uploads/categories/" + req.body.slug + "/" + req.body.image
    });
    /* save */
    category.save(function(error, categoryDocument) {
        if (error) {
            return res.status(500).json({
                title: "Greška! Kategorija nije snimljena u bazu",
                error: error
            });
        }
        if (!error) {
            res.status(201).json({
                title: "Bravo! Kategorija je uspešno snimljena u bazu",
                data: categoryDocument
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

// 2.GET ALL
router.get("/", function(req, res, next) {
    /* Find categories in DB */
    Category.find().exec(function(err, data) {
        if (err) {
            return res.status(500).json({
                title: "Greška! Niste dobili kategoriju iz baze",
                error: err
            });
        }
        res.status(200).json({
            message: "Bravo! Kategorija je uspešno učitana",
            object: data
        });
    });
});

/* 3. UPDATE */
router.put("/:id", function(req, res, next) {
    /* find document by ID */
    Category.findOneAndUpdate(
        /* ID match */
        {
            _id: req.params.id
        },
        /* update Category */
        {
            $set: {
                name: req.body.name,
                slug: req.body.slug,
                description: req.body.description
            }
        },
        /* callback */
        function(err, success) {
            if (err) {
                return res.status(500).json({
                    title: "Greška! Kategorija nije snimljena u bazu",
                    success: 0,
                    error: err
                });
            }
            res.status(201).json({
                title: "Bravo! Kategorija je uspešno snimljena u bazu",
                success: 1
            });
        }
    );
});

/* 4. DELETE */
router.delete("/:id", function(req, res, next) {
    Category.findOneAndRemove(
        /* slug match */
        {
            _id: req.params.id
        },
        /* callback */
        function(err, success) {
            if (err) {
                return res.status(500).json({
                    title: "Greška! Kategorija nije izbrisana iz baze",
                    success: 0,
                    error: err
                });
            }
            res.status(201).json({
                title: "Upravo ste izbrisali kategoriju iz baze",
                success: 1
            });
        }
    );
});

module.exports = router;
