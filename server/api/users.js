const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
// /users/cart/:id

// if(req.user) {
//   const order = await Order.findOne({
//     where: {
//       [Sequelize.Op.and]: [{userId: req.user.id},{orderStatus: 'pending'}],
//     },
//     include:Genie
//   });