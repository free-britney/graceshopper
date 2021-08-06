const router = require('express').Router()
const { Order } = require('../db')

router.post('/', async(req, res, next) => {
  console.log(req.body)
  try {
    const newOrder = await Order.create(req.body)
    res.json(newOrder)
  } catch (error) {
    next(error)
  }
})

module.exports = router
