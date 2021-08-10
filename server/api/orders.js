const router = require("express").Router();
const { token } = require("morgan");
const { Order } = require("../db");
const User = require("../db/models/User");

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
    if(req.body.userId){
      const newOrder = await Order.create(req.body);
      const currentUser = await User.findByPk(req.body.userId);
      currentUser.addOrder(newOrder);
    res.json(newOrder);
    } else {
      const newOrder = await Order.create(req.body);
      res.json(newOrder);
    }
  } catch (error) {
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const editOrder = await Order.findByPk(req.body.orderId);
    res.json(await editOrder.update(req.body))
  } catch (error) {
    next(error)
  }
})

module.exports = router;
