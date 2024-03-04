require("dotenv").config({path:"./secret/.env"})

const {Sequelize} = require("sequelize")
const cloudinary = require('cloudinary').v2;
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

const configCloudinary = () => {
  try {
    cloudinary.config({
      cloud_name: 'YOUR_CLOUD_NAME',
      api_key: 'YOUR_API_KEY',
      api_secret: 'YOUR_API_SECRET'
    });
  } catch (error) {
    console.log(error)
  }
}
configCloudinary()

module.exports = {sequelize,connect,cloudinary}
