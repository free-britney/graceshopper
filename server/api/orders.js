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


router.put('/', async (req, res, next) => {
  try {
      const newGenie = await Genie.findByPk(req.body.genieId)
      res.json(newGenie)
  } catch (err) {
    next(err)
  }
})
module.exports = router;

//orderline needs userId
//order table 

// if the product exists in cart 
// else add to cart  -- (object)

