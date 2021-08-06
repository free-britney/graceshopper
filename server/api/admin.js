const router = require("express").Router();
const { models: { User }} = require('../db')
const { requireToken, isAdmin } = require('./gateKeepingMiddleware')
module.exports = router

router.get("/", requireToken, isAdmin, async (req, res, next) => {
  try {
    const allUsers = await User.findAll({
      attributes: ['id', 'username']
    });
    res.json(allUsers);
  } catch (error) {
    next(error);
  }
});
