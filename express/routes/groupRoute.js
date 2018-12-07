// Dependencies
var express = require("express");
var router = express.Router();

// Middleware
const extractFile = require("../middleware/fileUpload");
const resize = require("../middleware/resize");
const checkAuth = require("../middleware/checkAuth");

// Controllers
const GroupController = require("../controllers/groupController")

router.post("/images/:id", checkAuth, extractFile, resize, GroupController.storeGroupImage);
router.post("/", checkAuth, GroupController.createGroup);

router.get("/:slug", GroupController.getOneGroup);
router.get("/", GroupController.getAllGroups);

router.put("/:id", checkAuth, GroupController.updateGroup);
router.delete("/:id", checkAuth, GroupController.deleteGroup);

module.exports = router;
