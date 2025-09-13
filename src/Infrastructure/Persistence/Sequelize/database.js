const { Sequelize } = require('sequelize');
const config = require('../../../config/index.js');

const sequelize = new Sequelize(config.db.url, {
    dialect: config.db.dialect,
    logging: config.db.logging ? console.log : false,
    define: {
        timestamps: true,
        underscored: false,
        freezeTableName: true
    },
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    dialectOptions: {
        ssl: process.env.NODE_ENV === 'production' ? {
            require: true,
            rejectUnauthorized: false
        } : false
    }
});

module.exports = sequelize;