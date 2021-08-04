const router = require("express").Router();
const Sequelize = require("sequelize");
const {
  models: { Order, User, Genie },
} = require("../db");

//PUT/api/cart
router.put("/", async (req,res,next)=> {
  try {
    if(req.user) {
      const order = await Order.findOne({
        where: {
          [Sequelize.Op.and]: [{userId: req.user.id},{orderStatus: 'pending'}],
        },
        include:Genie
      });
      qty = quantity
    }


  } catch (error) {
    next(error)
  }


})
//route for delete
router.delete('/:id', async (req, res, next) => {
  try {
    const genie = await Genie.findByPk(req.params.id);
    await genie.destroy();
    res.send(genie);
  } catch (error) {
    next(error);

  }
});
