const router = require('express').Router()
const { models: { User }} = require('../db')
const { requireToken, isAdmin } = require('./gateKeepingMiddleware')
module.exports = router

router.get('/', requireToken, isAdmin, async (req, res, next) => {
  // console.log("this is users.js req.headers", req.headers)
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username']
    })
    // console.log("hello")
    res.json(users)
  } catch (error) {
    next(error)
  }
})
