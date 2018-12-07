// Dependencies
var express = require("express");
var router = express.Router();

// Middleware
const extractFile = require("../middleware/fileUpload");
const resize = require("../middleware/resize");
const checkAuth = require("../middleware/checkAuth");

// Controllers
const CategoryController = require("../controllers/categoryController")


router.post("/images/:id", checkAuth, extractFile, resize, CategoryController.storeCategoryImage);
router.post("/", checkAuth, CategoryController.createCategory);

router.get("/:slug", CategoryController.getOneCategory);
router.get("/", CategoryController.getAllCategories);

router.put("/:id", checkAuth, CategoryController.updateCategory);
router.delete("/:id", checkAuth, CategoryController.deleteCategory);

module.exports = router;
