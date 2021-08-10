//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Genie = require("./models/Genie");
const Order = require("./models/Order");

//associations could go here!

Genie.belongsToMany(Order, { through: "Orderline" });
Order.belongsToMany(Genie, { through: "Orderline" });

Order.belongsTo(User);
User.hasMany(Order);


module.exports = {
  db,
  Genie,
  Order,

  // AN Note: Try not to touch User in this section so the already available auth section doesn't break.
  models: {
    User,
  },
};
