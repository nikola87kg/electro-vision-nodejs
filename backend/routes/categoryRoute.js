// Dependencies
var express = require("express");
var router = express.Router();

// Controllers
const CategoryController = require("../controllers/categoryController")


router.post("/images/:id", CategoryController.storeCategoryImage);
router.post("/", CategoryController.createCategory);

router.get("/:slug", CategoryController.getOneCategory);
router.get("/", CategoryController.getAllCategories);

router.put("/:id", CategoryController.updateCategory);
router.delete("/:id", CategoryController.deleteCategory);

module.exports = router;
