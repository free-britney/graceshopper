const Sequelize = require('sequelize')
const db = require('../db')


const Genie = db.define('genie', {
    name:{
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    price:{
        type: Sequelize.FLOAT,
        allowNull: false
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    imageURL: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    wishQty:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    inventory: {
        type: Sequelize.INTEGER
    },
    genieAbility: {
        type: Sequelize.STRING
    }
})

module.exports = Genie