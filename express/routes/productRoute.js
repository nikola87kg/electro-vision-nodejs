// Dependencies
var express = require("express");
var router = express.Router();

// Middleware
const extractFile = require("../middleware/fileUpload");
const checkAuth = require("../middleware/checkAuth");

// Controllers
const ProductController = require("../controllers/productController")

router.post("/images/:id", checkAuth, extractFile, ProductController.storeProductImage);
router.post("/", checkAuth, ProductController.createProduct);

router.get("/:slug", ProductController.getOneProduct);
router.get("/", ProductController.getAllProducts);

router.put("/:id", checkAuth, ProductController.updateProduct);
router.delete("/:id", checkAuth, ProductController.deleteProduct);

module.exports = router;
