require("dotenv").config({path:"./secret/.env"})

const {Sequelize} = require("sequelize")
const sequelize = new Sequelize(`${process.env.DBURL}`)

const connect = async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync({ alter: true })
        console.log("Synced db.");
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
 
module.exports = {sequelize,connect}
