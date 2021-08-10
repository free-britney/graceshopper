const Sequelize = require("sequelize");
const db = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");

const SALT_ROUNDS = 5;

const User = db.define("user", {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  adminStatus: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  address: {
    type: Sequelize.TEXT,
  },
  email:{
    type:Sequelize.STRING,
    validate:{
      isEmail:{
        args:true,
        msg:'Valid email-id required'
        }
    },
    unique: {
      args:true,
      msg: 'Email address already in use!'
    }
},

  phone: {
    type: Sequelize.INTEGER,
  },
  name: {
    type: Sequelize.STRING,
  },
});

module.exports = User;

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  //we need to compare the plain version to an encrypted version of the password
  return bcrypt.compare(candidatePwd, this.password);
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT);
};

/**
 * classMethods
 */
User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({ where: { username } });
  if (!user || !(await user.correctPassword(password))) {
    const error = Error("Incorrect username/password");
    error.status = 401;
    throw error;
  }
  return user.generateToken();
};

User.findByToken = async function (token) {
  try {
    // console.log(token)
    const { id } = await jwt.verify(token, process.env.JWT);
    // console.log(id)
    const user = await User.findByPk(id);
    // console.log(user)
    if (!user) {
      throw "nooo";
    }
    // console.log("in findByToken")
    // console.log("it should work!!!")
    // Promise { <pending> } in browser
    return user;
  } catch (ex) {
    const error = Error("bad token");
    error.status = 401;
    throw error;
  }
};

/**
 * hooks
 */
const hashPassword = async (user) => {
  //in case the password has been changed, we want to encrypt it with bcrypt
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
  }
};

User.beforeCreate(hashPassword);
User.beforeUpdate(hashPassword);
User.beforeBulkCreate((users) => Promise.all(users.map(hashPassword)));
