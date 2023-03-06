// Dependencies
var express = require("express");
var router = express.Router();

// Middleware
const checkAuth = require("../middleware/checkAuth");

// Controllers
const EmploymentController = require("../controllers/employmentController")

router.get("/", EmploymentController.getAllEmployments);
router.post("/", EmploymentController.createEmployment);
router.delete("/:id", checkAuth, EmploymentController.deleteEmployment);

module.exports = router;
