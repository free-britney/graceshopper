const router = require('express').Router()
const { models: {User }} = require('../db')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    // const token = await User.authenticate(req.body)
    res.send({ token: await User.authenticate(req.body)});
  } catch (error) {
    next(error)
  }
})


router.post('/signup', async (req, res, next) => {
  try {
    const { username, password, address, email, phone, name } = req.body
    const user = await User.create({ username, password, address, email, phone, name })
    res.send({token: await user.generateToken()})
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(error)
    }
  }
})

router.get('/me', async (req, res, next) => {
  // console.log("get route from auth me", req.headers)
  try {
    res.send(await User.findByToken(req.headers.authorization))
  } catch (ex) {
    next(ex)
  }
})
