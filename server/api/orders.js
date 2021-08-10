const router = require("express").Router();
const { Order } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    // o: check for when not found
    const data = await Order.findByPk(req.body.orderId);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body);
    res.json(newOrder);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
