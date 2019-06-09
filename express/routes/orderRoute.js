// Dependencies
var express = require("express");
var router = express.Router();

// Middleware
const checkAuth = require("../middleware/checkAuth");

// Controllers
const OrderController = require("../controllers/orderController")

router.get("/", OrderController.getAllOrders);
router.post("/", OrderController.createOrder);
router.delete("/:id", checkAuth, OrderController.deleteOrder);

module.exports = router;
