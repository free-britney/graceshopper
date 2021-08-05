const Sequelize = require("sequelize");
const db = require("../db");

const Genie = db.define("genie", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  // o: you don't need Sequelize.TEXT here
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  imageURL: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  // o: what is this?
  wishQty: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  inventory: {
    type: Sequelize.INTEGER,
  },
  genieAbility: {
    type: Sequelize.STRING,
  },
});

module.exports = Genie;
