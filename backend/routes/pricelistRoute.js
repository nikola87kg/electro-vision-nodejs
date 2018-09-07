// Dependencies
var express = require("express");
var router = express.Router();

// Middleware
const extractFile = require("../middleware/fileUpload");

// Controllers
const PricelistController = require("../controllers/pricelistController")

router.get("/", PricelistController.getAllPricelists);
router.post("/", PricelistController.createPricelist);
router.put("/:id", PricelistController.updatePricelist);
router.delete("/:id", PricelistController.deletePricelist);

module.exports = router;
