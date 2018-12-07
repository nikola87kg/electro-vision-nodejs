// Dependencies
var express = require("express");
var router = express.Router();

// Middleware
const checkAuth = require("../middleware/checkAuth");

// Controllers
const PricelistController = require("../controllers/pricelistController")

router.get("/", PricelistController.getAllPricelists);
router.post("/", checkAuth, PricelistController.createPricelist);
router.put("/:id", checkAuth, PricelistController.updatePricelist);
router.delete("/:id", checkAuth, PricelistController.deletePricelist);

module.exports = router;
