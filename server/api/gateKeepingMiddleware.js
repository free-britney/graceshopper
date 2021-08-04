const { models: { User } } = require('../db')

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const user = await User.findByToken(token)
    console.log(user)
    console.log(token)
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

const isAdmin = (req, res, next) => {
  if(!req.user.adminStatus) {
    return res.status(403).send("You are not an admin!")
  } else {
    next()
  }
}

module.exports = {
  requireToken,
  isAdmin
}
