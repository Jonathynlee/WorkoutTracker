
const router = require("express").Router();
const applicationController = require("../controllers/application_controller.js");



router.get("/", applicationController.home);



module.exports = router;
