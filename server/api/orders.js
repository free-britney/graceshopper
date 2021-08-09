const router = require("express").Router();
const { Order, Genie } = require("../db");

router.get("/", async (req, res, next) => {
  try {
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
router.put("/:userId", async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: "pending",
      },
    });
    if (order) {
      res.send(await order.update(req.body)).status(204);
    } else {
      res.send(await Order.create(req.body)).status(201);
    }
  } catch (err) {
    next(err);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    // let currentOrder = await Order.findOne({
    //   where: {
    //     userId: req.params.userId,
    //     status: "open",
    //   },
    // });
    let genie = await Genie.findByPk(req.params.id);
    await genie.destroy();
    res.status(201).send(genie);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
