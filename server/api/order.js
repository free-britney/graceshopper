const router = require("express").Router();
const { Order } = require("../db");
const Genie = require("../db/models/Genie");


router.put("/", async (req, res, next) => {
  try {
    const addToOrder = await Genie.findByPk(genieId);
    res.json(addToOrder);
  } catch (error) {
    next(error);
  }
});

module.exports = router;