const express = require("express");
const router = express.Router();

// Middleware
const extractFile = require("../middleware/fileUpload");
const resize = require("../middleware/resize");
const checkAuth = require("../middleware/checkAuth");

// Controllers
const BrandController = require("../controllers/brandController")

router.post("/images/:id", checkAuth, extractFile, resize, BrandController.storeBrandImage);
router.post("/",  checkAuth, BrandController.createBrand);

router.get("/:slug", BrandController.getOneBrand);
router.get("/", BrandController.getAllBrands);

router.put("/:id",  checkAuth, BrandController.updateBrand);
router.delete("/:id",  checkAuth, BrandController.deleteBrand);

module.exports = router;
