// Dependencies
var express = require("express");
var router = express.Router();

// Middleware
const extractFile = require("../middleware/fileUpload");

// Controllers
const GalleryController = require("../controllers/galleryController")

router.post("/images/:id", extractFile, GalleryController.storeGalleryImage);
router.post("/", GalleryController.createGallery);

router.get("/", GalleryController.getAllGalleries);

router.put("/:id", GalleryController.updateGallery);
router.delete("/:id", GalleryController.deleteGallery);

module.exports = router;
