// Dependencies
var express = require("express");
var router = express.Router();

// Controllers
const GroupController = require("../controllers/groupController")

router.post("/images/:id", GroupController.storeGroupImage);
router.post("/", GroupController.createGroup);

router.get("/:slug", GroupController.getOneGroup);
router.get("/", GroupController.getAllGroups);

router.put("/:id", GroupController.updateGroup);
router.delete("/:id", GroupController.deleteGroup);

module.exports = router;
