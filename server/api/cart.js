const router = require("express").Router();
const Sequelize = require("sequelize");
const {
  models: { Order, User, Genie },
} = require("../db");
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
