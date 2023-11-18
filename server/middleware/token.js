require("dotenv").config({path:"./keys/env"})
const jwt = require("jsonwebtoken")
const User = require("../models/user.js")

const getToken = async (req,res,next) => {
    /*const authorization = request.get("authorization");
    if(authorization && authorization.toLowerCase().startsWith("bearer ")){
        return authorization.substring(7);
    }
    return null;*/
    try {
        const token = req.header("authorization").substring(7);
        if(!token) return res.status(401).json("Access denied. Please log in");
        jwt.verify(token,process.env.SECRET,(error,userToken)=>{
            if(error) return res.status(400).json("Invalid token")
            const username = userToken.username;
            User.findOne({username}).then(user=>{
                req.user = user
                next()
            })
            
        });
    } catch (error) {
        return res.status(400).json("Token error")
    }

}

module.exports = getToken