const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  // o: check to see if Sequelize already creates this for you
  //   by deleting and seeing if your app works
  userId: {
    type: Sequelize.INTEGER,
  },
  // o: store is as pennies (INTEGER)
  totalAmount: {
    type: Sequelize.FLOAT,
  },
  orderStatus: {
    type: Sequelize.ENUM("pending", "purchased"),
  },
});

module.exports = Order;
