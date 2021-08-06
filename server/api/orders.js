const router = require("express").Router();
const { Order } = require("../db");
const Genie = require("../db/models/Genie");


// router.put("/", async (req, res, next) => {
//   try {
//     const addToOrder = await Genie.findByPk(req.body.id);
//     console.log(req.body);
//     res.json(addToOrder);
//   } catch (error) {
//     next(error);
//   }
// });

// users/2/cart - make a route 

router.post('/:id/orders', async (req, res, next) => {
  try {
      const newOrder = await Order.create(req.body.genieId)
      res.json(newOrder)
  } catch (err) {
    next(err)
  }
})
module.exports = router;

//orderline needs userId
//order table 

// if the product exists in cart 
// else add to cart  -- (object)

