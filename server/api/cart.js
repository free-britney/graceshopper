const router = require("express").Router();
const Sequelize = require("sequelize");
const {
  models: { Order, User, Genie,Orderline, }
} = require("../db");
router.post("/", async (req, res, next) => {
  try {
    const userId = req.body[0].id;
    const product = req.body[1];
    const quantityType = req.body[2];

    let currentOrder = await Order.findOne({
      where: {
        userId: userId,
        status: "pending",
      },
    });
    let user = await User.findByPk(userId);
    if (!currentOrder) {
      currentOrder = await Order.create();
      user.addOrders(currentOrder);
    } else {
    let orderProduct = await Orderline.findOne({
      where: {
        orderId: currentOrder.id,
        productId: product.id,
      },
    });
    if (orderProduct && quantityType.type === "addQty") {
      orderProduct.quantity++;
      orderProduct.save();
    } else if (
      orderProduct &&
      quantityType.type === "lessQty" &&
      orderProduct.quantity >= 1) {
      orderProduct.quantity--;
      orderProduct.save();
    }
    let newProduct = await Genie.findByPk(product.id);
    await currentOrder.addProducts(newProduct);
    res.status(201).send(newProduct);
  } } catch (err) {
    next(err);
  }
});


//PUT/api/cart
router.put("/:id",  async (req,res,next)=> {
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
