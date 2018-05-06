// Dependencies
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var fs = require("fs");

// Model
var Brand = require("../models/brandModel");

/** FILE UPLOAD */

const multer = require("multer");

var storeFile = multer.diskStorage({
    destination: function(req, file, cb) {
        let folderDest = "./dist/assets/uploads/brands/" + req.params.slug + "/"; //folder path
        fs.mkdir(folderDest, (error) => { console.log(error) }); // create folder
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
    var brand = new Brand({
        name: req.body.name,
        description: req.body.description,
        slug: req.body.slug,
        image: "/assets/uploads/brands/" + req.body.slug + "/" + req.body.image
    });
    /* save */
    brand.save(function(error, brandDocument) {
        if (error) {
            return res.status(500).json({
                title: "Greška! Brend nije snimljen u bazu",
                success: 0,
                error: error
            });
        }
        if (!error) {
            return res.status(201).json({
                title: "Bravo! Brend je uspešno snimljen u bazu",
                success: 1,
                data: brandDocument
            });
        }
    });
});

// 2.GET BY SLUG
router.get("/:slug", function(req, res, next) {
        /* Query */
        Brand.
        findOne({ slug: req.params.slug }).
        exec(callback);
        /* Callback */
        var callback = {function(error, brand) {
          if (error) {
                  return res.status(500).json({
                          title: "Greška! Niste dobili listu brendova iz baze",
                          error: error
                  });
          }
          if (!error) {
                  return res.status(200).json({
                          message: "Bravo! Brendovi su uspešno učitani",
                          object: brand
                  });
          }
      }}
});

// 2.GET ALL
router.get("/", function(req, res, next) {
    /* Find brands in DB */
    Brand.
      find().
      exec(function(err, data) {
        if (err) {
            return res.status(500).json({
                title: "Greška! Niste dobili listu brendova iz baze",
                error: err
            });
        }
        res.status(200).json({
            message: "Bravo! Brendovi su uspešno učitani",
            object: data
        });
    });
});

/* 3. UPDATE */
router.put("/:id", function(req, res, next) {
    /* find document by ID */
    Brand.findOneAndUpdate(
        /* ID match */
        {
            _id: req.params.id
        },
        /* update brand */
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
                    title: "Greška! Brend nije snimljen u bazu",
                    success: 0,
                    error: err
                });
            }
            res.status(201).json({
                title: "Bravo! Brend je uspešno snimljen u bazu",
                success: 1
            });
        }
    );
});

/* 4. DELETE */
router.delete("/:id", function(req, res, next) {
    Brand.findOneAndRemove(
        /* slug match */
        {
            _id: req.params.id
        },
        /* callback */
        function(err, success) {
            if (err) {
                return res.status(500).json({
                    title: "Greška! Brend nije izbrisan iz baze",
                    success: 0,
                    error: err
                });
            }
            res.status(201).json({
                title: "Upravo ste izbrisali brend iz baze",
                success: 1
            });
        }
    );
});

module.exports = router;
