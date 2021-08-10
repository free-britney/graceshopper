// AN Edit - Requiring in router
const router = require("express").Router();

// AN Edit - Requiring in Genie Model since I'll need to pull data from it
const { Genie } = require("../db");
const { requireToken, isAdmin } = require('./gateKeepingMiddleware')

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
// in this get route -- try using require token to see if it's logged-in 
router.get('/:genieId', async (req, res, next) => {
  try {
    const singleGenie = await Genie.findByPk(req.params.genieId)
    if (singleGenie) {
      res.json(singleGenie);
    }
  } catch(error) {
    next(error);
  }
})

// EH  - admin route for add product POST works in postman
router.post('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    res.status(201).send(await Genie.create(req.body));
  } catch (error) {
    next(error);
  }
})

// EH - admin route for edit product PUT works in postman
router.put('/:genieId', requireToken, isAdmin, async (req, res, next) => {
  try {
    const genie = await Genie.findByPk(req.params.genieId);
    res.json(genie.update(req.body));
  } catch (error) {
    next(error);
  }
})

// EH - admin route for delete product DELETE works in postman
router.delete('/:genieId', requireToken, isAdmin, async (req, res, next) => {
  try {
    const genieToDestroy = await Genie.findByPk(req.params.genieId);
    await genieToDestroy.destroy();
    res.send(genieToDestroy);
  } catch (error) {
    next(error);
  }
})

// AN Edit - Exporting Router
module.exports = router;
