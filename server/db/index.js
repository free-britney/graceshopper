//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Genie = require("./models/Genie");
const Order = require("./models/Order");
// const { BelongsToMany } = require('sequelize/types')

//associations could go here!

// FL Note: Changed the name of the through table for clarity
// FL Note: Created a Cart in the database -- let me know if you have any questions on this.

Genie.belongsToMany(Order, { through: "OrderGenies" });
Order.belongsToMany(Genie, { through: "OrderGenies" });

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
