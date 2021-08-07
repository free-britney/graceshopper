const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  totalAmount: {
    type: Sequelize.INTEGER,
  },
  orderStatus: {
    type: Sequelize.ENUM("pending", "purchased"),
    defaultValue: "pending",
  },
  isCart: {
    type: Sequelize.BOOLEAN,
  }
});

module.exports = Order;
