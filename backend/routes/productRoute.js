// Dependencies
var express = require("express");
var router = express.Router();

// Controllers
const ProductController = require("../controllers/productController")

router.post("/images/:id", ProductController.storeProductImage);
router.post("/", ProductController.createProduct);

router.get("/:slug", ProductController.getOneProduct);
router.get("/", ProductController.getAllProducts);

router.put("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.deleteProduct);

module.exports = router;
