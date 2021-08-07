const router = require("express").Router();
const Sequelize = require("sequelize");
const {
  models: { Order, User, Genie },
} = require("../db");


//PUT/api/cart
router.put("/:uderId",  async (req,res,next)=> {
  try {
    if(req.user) {
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
router.delete('/:userId', async (req, res, next) => {
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
