const { models: { User } } = require('../db')

// o: is there a middleware for checking if someone is loggedin or not?
const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const user = await User.findByToken(token)
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
