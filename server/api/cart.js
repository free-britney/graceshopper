const router = require("express").Router();
const Sequelize = require("sequelize");
const {
  models: { Order, Orderline, Genie },
} = require("../db");


//PUT/api/cart
router.put("/",  async (req,res,next)=> {
  try {
    if(req.user) {
      const order = await Order.findOne({
        where: {
          [Sequelize.Op.and]: [{userId: req.user.id},{orderStatus: 'pending'}],
        },
        include:Genie
      });
     const {genieId } = req.body
     let item = order.genies.filter((genie)=> genie.id === genieId )
     console.log('item', item);
     res.send(item)
    }
  } catch (error) {
    next(error)
  }


})

//should create a cart with new added item
//route for delete
router.delete('/genie/:id', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        [Sequelize.Op.and]: [{userId: req.user.id},{orderStatus: 'pending'}],
      },
      include:Genie
    })
    await Orderline.desroy({
      where: {
        [Sequelize.Op.and]: [
          { orderId: order.id },
          { cocktailId: req.params.id },
        ],
      },
    });
    res.sendStatus(200);
  } catch (error) {
    next(error);

  }
});
