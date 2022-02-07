const { Sequelize, DataTypes } = require("sequelize");
const db = require('../config/database'); 
const user = require('./userModel');

const scores = db.define('scores',{
    score_id: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    score: {
        type:DataTypes.INTEGER,
    },
    user_id: {
        type:DataTypes.INTEGER,
        allowNull: false,
    }
});  

module.exports = scores;