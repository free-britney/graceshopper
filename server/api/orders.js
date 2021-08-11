const router = require("express").Router();
const { Order, Genie, Orderline } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const data = await Order.findByPk(req.body.orderId);
    res.json(data);
  } catch (error) {
    next(error);
  }
});
//Post Route for guest user
router.post("/", async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body);
    res.json(newOrder);
  } catch (error) {
    next(error);
  }
});
//Post Route for User
router.post("/:userId", async (req, res, next) => {
  try {
    if(req.user) {
      let currentOrder = await Order.findOne({
        where: {
          userId: req.user.id,
          status: "pending",
        },
      });
      await Orderline.create({
        orderId:currentOrder.id,
        genieId:req.body.genieId,
        quanantity:req.body.quantity
      })
      const genies = await Order.getGenies();
      res.send({currentOrder, genies})
    } else {
      const newOrder = await Genie.create(req.body.order);
      req.body.genies.forEach(async (genie)=> {
        await Orderline.create(({
          orderId: newOrder.id,
          genieId: genie.id,
          quantity:genie.quantity
        }))
      })
      res.send(newOrder);
    }
  } catch (error) {
      next(error)
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

router.delete("/:userId/:genieId", async (req, res, next) => {
  try {
    let order = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: "pending",
      },
    });
    let genie = await Genie.findByPk(req.params.genieId);
    await order.removeProduct(genie);
    res.status(201).send(genie);
  } catch (error) {
    next(error);
  }
});



module.exports = router;
