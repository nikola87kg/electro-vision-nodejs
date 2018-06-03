// Dependencies
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var fs = require("fs-extra"); // file system
var ncp = require("ncp").ncp; // copy files
const multer = require("multer"); // image uplaoder

// Model
var Group = require("../models/groupModel");
var Category = require("../models/categoryModel");

/*************************** IMAGE UPLOAD ***************************/

// destination and filename
var storeFile = multer.diskStorage({
    destination: function(req, file, callback) {
        let folderDest =
            "./dist/electro-vision/assets/uploads/groups/" +
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
            title: "Bravo! Slika grupe je uspešno snimljena u bazu",
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
    var group = new Group({
        name: req.body.name,
        description: req.body.description,
        slug: req.body.slug,
        category: req.body.category,
        image: "./assets/uploads/groups/default.jpg"
    });
    // save to DB
    group.save(function(err, data) {
        if (err) {
            return res.status(500).json({
                title: "Greška! Grupa nije snimljena u bazu",
                error: err
            });
        }
        res.status(201).json({
            title: "Bravo! Grupa je uspešno snimljena u bazu",
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
            "./assets/uploads/groups/" + req.params.id + "/" + imageName;
    }
    // find document by ID
    Group.findOneAndUpdate(
        // ID match
        { _id: req.params.id },
        // update group
        {
            $set: {
                name: req.body.name,
                slug: req.body.slug,
                category: req.body.category,
                description: req.body.description,
                image: fullImage
            }
        },
        // callback
        function(err, data) {
            if (err) {
                return res.status(500).json({
                    title: "Greška! Grupa nije snimljena u bazu",
                    error: err
                });
            }
            res.status(201).json({
                title: "Bravo! Grupa je uspešno snimljena u bazu",
                id: data.id,
                success: 1
            });
        }
    );
});

/*************************** 3.GET  ***************************/

router.get("/", function(req, res, next) {
    // Query
    const query = Group.find();
    // Populate and exec
    query.populate("category", ["_id", "name"])
         .exec(function(err, groupList) {
        if (err) {
            return res.status(500).json({
                title: "Greška! Niste dobili listu grupa iz baze",
                error: err
            });
        }
        res.status(200).json({
            message: "Bravo! Grupe su uspešno učitane",
            object: groupList
        });
    });
});

/*************************** 4. DELETE ***************************/

router.delete("/:id", function(req, res, next) {
    Group.findOneAndRemove(
        /* id match */
        { _id: req.params.id },
        /* callback */
        function(err, data) {
            /* error */
            if (err) {
                return res.status(500).json({
                    title: "Greška! Grupa nije izbrisana iz baze",
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
                title: "Upravo ste izbrisali grupu iz baze",
                success: 1,
                data: data
            });
        }
    );
});

module.exports = router;
