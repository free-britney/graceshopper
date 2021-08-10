const router = require("express").Router();
const { models: { User }} = require('../db')
const { requireToken, isAdmin } = require('./gateKeepingMiddleware')
module.exports = router

// o: why is this code in two places? also in user.js
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
