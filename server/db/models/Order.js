const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
    userId: {
      type: Sequelize.INTEGER,
    },
    totalAmount: {
      type: Sequelize.FLOAT,
    }, 
    orderStatus: {
      type: Sequelize.ENUM('pending', 'purchased'),
    },
  })
  
  module.exports = Order