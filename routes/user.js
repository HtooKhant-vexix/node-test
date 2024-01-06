const router = require("express").Router();
const controller = require("../controller/user");

router.get("/", controller.get);
router.post("/", controller.post);

router
  .route("/:id")
  .post(controller.post)
  .get(controller.singleGet)
  .delete(controller.drop)
  .patch(controller.patch);

// router.get("/:id",);
// router.patch("/:id",);
// router.delete("/:id",);

module.exports = router;
