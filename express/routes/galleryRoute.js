// Dependencies
var express = require("express");
var router = express.Router();

// Middleware
const extractFile = require("../middleware/fileUpload");
const resizeBig = require("../middleware/resize-big");
const checkAuth = require("../middleware/checkAuth");

// Controllers
const GalleryController = require("../controllers/galleryController")

router.post("/images/:id", checkAuth, extractFile, resizeBig, GalleryController.storeGalleryImage);
router.post("/", checkAuth, GalleryController.createGallery);

router.get("/", GalleryController.getAllGalleries);

router.put("/:id", checkAuth, GalleryController.updateGallery);
router.delete("/:id", checkAuth, GalleryController.deleteGallery);

module.exports = router;
