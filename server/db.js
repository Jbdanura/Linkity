require("dotenv").config({path:"./secret/.env"})

const {Sequelize} = require("sequelize")
const sequelize = new Sequelize(`postgres://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBLOC}:${process.env.DBPORT}/${process.env.DBNAME}`)

const connect = async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync()
        console.log("Synced db.");
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
 
module.exports = {sequelize,connect}
