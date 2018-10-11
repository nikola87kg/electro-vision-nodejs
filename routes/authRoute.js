// Dependencies
var express = require("express");
var router = express.Router();

// Controllers
const AuthController = require("../controllers/authController")

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);

module.exports = router;
