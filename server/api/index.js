const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
// AN Edit - Creating Router for Genies
router.use("/genies", require("./genies"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
