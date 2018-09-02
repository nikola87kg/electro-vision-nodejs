// Dependencies
var express = require("express");
var router = express.Router();

// Middleware
const extractFile = require("../middleware/fileUpload");

// Controllers
const BrandController = require("../controllers/brandController")

router.post("/images/:id", extractFile, BrandController.storeBrandImage);
router.post("/", BrandController.createBrand);

router.get("/:slug", BrandController.getOneBrand);
router.get("/", BrandController.getAllBrands);

router.put("/:id", BrandController.updateBrand);
router.delete("/:id", BrandController.deleteBrand);

module.exports = router;
