const Sequelize = require('sequelize');
const db = require('../db');

const orderlines= db.define('orderlines', {

    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        validate: {
            min: 1
        }
    },
});


module.exports = orderlines;
