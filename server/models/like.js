const {DataTypes} = require("sequelize")
const {sequelize} = require("../db")

const Like = sequelize.define("Like",{
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    postId:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    sequelize
})

module.exports = Like