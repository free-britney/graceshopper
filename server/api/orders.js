const router = require("express").Router();
const { Order,Genie } = require("../db");
const Sequelize = require("sequelize");

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
//PUT/api/cart
router.put("/",  async (req,res,next)=> {
  try {
   {

      const order = await Order.findOne({
        where: {
          [Sequelize.Op.and]: [{userId: req.params.userId},{orderStatus: 'pending'}],
        },
      });
      if (order) {
        res.send(await order.update(req.body)).status(204);
        //creating order if not exists
      } else {
        res.send(await Order.create(req.body)).status(201);
      }
    }
  } catch (error) {
    next(error)
  }
})
//route for deleting product
router.delete('/:id', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        [Sequelize.Op.and]: [{userId: req.user.id},{orderStatus: 'pending'}],
      },
    })
    let genie= await Genie.findByPk(req.params.genieId);
    await order.destroy(genie);
    res.status(201).send(genie);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
