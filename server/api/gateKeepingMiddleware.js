const { models: { User } } = require('../db')

const requireToken = async (req, res, next) => {
  // console.log("this is req.headers: ", req.headers)
  try {
    const token = req.headers.authorization //req.headers doesn't have an authorization - where is this coming from, where to trace
    //tried to set our own header and it didn't work
    //Window.localStorage.getItem('token')
    // console.log(token)
    const user = await User.findByToken(token)
    // console.log(user)
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
