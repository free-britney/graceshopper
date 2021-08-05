// AN Edit - Requiring in router
const router = require("express").Router();

// AN Edit - Requiring in Genie Model since I'll need to pull data from it
const { Genie } = require("../db");

// AN Edit - This is the route to serve up all genies available for purchase
router.get("/", async (req, res, next) => {
  try {
    const allGenies = await Genie.findAll();
    res.json(allGenies);
  } catch (error) {
    next(error);
  }
});

// EH Edit - this is the route to serve up single genies
router.get('/:genieId', async (req, res, next) => {
  try {
    // o: make sure to only send data when genie exists
    const singleGenie = await Genie.findByPk(req.params.genieId)
    res.json(singleGenie);
  } catch(error) {
    next(error);
  }
})

// AN Edit - Exporting Router
module.exports = router;
