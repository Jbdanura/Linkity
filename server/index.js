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
const rateLimit = require("express-rate-limit")
const {sequelize} = require("./db.js")

app.use(cors())

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

app.use(limiter)

app.use(bodyParser.json())

app.listen(777,()=>{
    console.log("wease")
})

app.use("/users",usersRouter)
app.use("/posts",postsRouter)