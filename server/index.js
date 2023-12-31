require("dotenv").config({path:"./secret/.env"})
const express = require("express");
const app = express();
const {connect} = require("./db.js")
const usersRouter = require("./controllers/users.js")
const postsRouter = require("./controllers/posts.js")
const cors = require('cors')
const bodyParser = require("body-parser")
const User = require("./models/user.js")
const Post = require("./models/post.js")
const Comment = require("./models/comment.js")
const Follow = require("./models/follow.js")
const rateLimit = require("express-rate-limit")

app.use(cors())
app.enable('trust proxy')
connect()

const modelsSync = () => {
    try {
      User.hasMany(Post,{
        foreignKey:"userId"
      })
      Post.belongsTo(User)
      User.hasMany(Comment,{
        foreignKey:"userId"
      })
      Post.hasMany(Comment,{
        foreignKey:"postId"
      })
      Comment.belongsTo(User)
      Comment.belongsTo(Post)
      User.belongsToMany(User,{through:Follow, as:"following", foreignKey:"followingId"})
      User.belongsToMany(User,{through:Follow, as:"follower", foreignKey:"followerId"})
      Follow.belongsTo(User, { as: 'follower', foreignKey: 'followerId' });
      Follow.belongsTo(User, { as: 'following', foreignKey: 'followingId' });
    } catch (error) {
      console.log(error)
    }
  }
  
modelsSync()

const limiter = rateLimit({
	windowMs: 15 * 60 * 10000,
	limit: 1000,
	standardHeaders: 'draft-7', 
	legacyHeaders: false, 
})

const https = require("https");
setInterval(function() {
    try{
        https.get("https://linkity.onrender.com");
    } catch (error){
        console.log(error)
    }
}, 600000)


app.use(limiter)

app.use(bodyParser.json())

app.listen(process.env.PORT,()=>{
    console.log("running server!")
})

app.use("/users",usersRouter)
app.use("/posts",postsRouter)
