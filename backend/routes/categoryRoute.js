// Dependencies
var express = require("express");
var router = express.Router();

// Middleware
const extractFile = require("../middleware/fileUpload");

// Controllers
const CategoryController = require("../controllers/categoryController")


router.post("/images/:id", extractFile, CategoryController.storeCategoryImage);
router.post("/", CategoryController.createCategory);

router.get("/:slug", CategoryController.getOneCategory);
router.get("/", CategoryController.getAllCategories);

router.put("/:id", CategoryController.updateCategory);
router.delete("/:id", CategoryController.deleteCategory);

module.exports = router;
