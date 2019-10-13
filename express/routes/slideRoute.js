// Dependencies
var express = require("express");
var router = express.Router();

// Middleware
const extractFile = require("../middleware/fileUpload");
const resize = require("../middleware/resize");
const checkAuth = require("../middleware/checkAuth");

// Controllers
const SlideController = require("../controllers/slideController")

router.post("/images/:id", checkAuth, extractFile, resize, SlideController.storeSlideImage);
router.post("/", SlideController.createSlide);

router.get("/", SlideController.getAllSlides);

router.put("/:id", SlideController.updateSlide);
router.delete("/:id", checkAuth, SlideController.deleteSlide);

module.exports = router;
