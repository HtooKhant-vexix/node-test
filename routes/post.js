const router = require("express").Router();
const controller = require("../controller/post.js");

router.get("/", controller.all);
router.post("/", controller.post);

router.route("/:id").patch(controller.patch);

module.exports = router;
