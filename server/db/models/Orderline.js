const Sequelize = require('sequelize');
const db = require('../db');

const Orderline = db.define('orderline', {

    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        validate: {
            min: 1
        }
    },
});


module.exports = Orderline;
