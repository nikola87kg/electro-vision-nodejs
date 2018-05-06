// Dependencies
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var fs = require("fs");

// Model
var Product = require("../models/productModel");
var Group = require("../models/groupModel");
var Brand = require("../models/brandModel");

/* FILE UPLOAD */

const multer = require("multer");
const storagePath = '/assets/uploads/products/';

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        let folderDest = "./dist" + storagePath + req.params.slug + "/";
        fs.mkdir(folderDest);
        cb(null, folderDest);
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

var upload = multer({
    storage: storage
}).single("file");

/* UPLOAD IMAGE ROUTE */
router.post("/images/:slug", function(req, res) {
    upload(req, res, function(err) {
        console.log("Image", req.body);
        if (err) {
            res.json({
                title: "Greška! Slika nije snimljena u bazu",
                success: 0,
                error: err
            });
            return;
        }
        res.json({
            title: "Bravo! Slika je uspešno snimljena u bazu",
            success: 1,
            image: req.file.path
        });
    });
});

// 1. POST
router.post("/", function(req, res, next) {
    /* extract request data */
    var product = new Product({
        name:           req.body.name,
        description:    req.body.description,
        slug:           req.body.slug,
        group:          req.body.group,
        category:       req.body.category,
        brand:          req.body.brand,
        image:          storagePath + req.body.slug + "/" + req.body.image
    });
    /* save */
    product.save(function(err, data) {
        if (err) {
            return res.status(500).json({
                title: "Greška! Proizvod nije snimljen u bazu",
                success: 0,
                error: err
            });
        }
        res.status(201).json({
            title: "Bravo! Proizvod je uspešno snimljen u bazu",
            success: 1,
            data: data
        });
    });
});

// 2.GET BY SLUG
router.get("/:slug", function(req, res, next) {
    /* Query Builder */
    Product.findOne({ slug: req.params.slug })
        .populate("group", ["name", "slug"] )
        .populate("category", ["name", "slug"] )
        .populate("brand", ["name", "slug"] )
        .exec(callback);
    /* Callback method */
    var callback = function(error, data) {
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
    }
});

// 2.GET ALL
router.get("/", function(req, res, next) {
    /* Find products in DB */
    Product.find()
        .populate("group", "name")
        .populate("category", "name")
        .populate("brand", "name")
        .exec(function(err, data) {
            if (err) {
                return res.status(500).json({
                    title: "Greška! Niste dobili listu proizvoda iz baze",
                    error: err
                });
            }
            res.status(200).json({
                message: "Bravo! Proizvodi su uspešno učitani",
                object: data
            });
        });
});

/* 3. UPDATE */
router.put("/:id", function(req, res, next) {

    /* udpate document */
    Product.findOneAndUpdate(
        /* query criteria */
        {
            _id: req.params.id
        },
        /* update product */
        {
            $set: {
                name: req.body.name,
                slug: req.body.slug,
                category: req.body.category,
                brand: req.body.brand,
                group: req.body.group,
                description: req.body.description
            }
        },
        /* callback */
        function(err, product) {
            if (err) {
                return res.status(500).json({
                    title: "Greška! Proizvod nije snimljen u bazu",
                    error: err
                });
            }
            res.status(201).json({
                title: "Bravo! Proizvod je uspešno snimljen u bazu",
                data: product,
                success: 1
            });
        }
    );
});

/* 4. DELETE */
router.delete("/:id", function(req, res, next) {
    Product.findOneAndRemove(
        /* id match */
        {
            _id: req.params.id
        },
        /* callback */
        function(err, success) {
            if (err) {
                return res.status(500).json({
                    title: "Greška! Proizvod nije izbrisan iz baze",
                    error: err
                });
            }
            res.status(201).json({
                title: "Upravo ste izbrisali proizvod iz baze",
                success: 1
            });
        }
    );
});

module.exports = router;



