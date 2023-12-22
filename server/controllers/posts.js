const postsRouter = require("express").Router()
const User = require("../models/user.js")
const Post = require("../models/post.js")
const Comment = require("../models/comment.js")
const getToken = require("../middleware/token.js")

postsRouter.get("/all",async(req,res)=>{
    const posts = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ["username"],
          },
          {
            model: Comment,
            include: [
              {
                model: User,
                attributes: ["username"],
              },
            ],
          },
        ],
        order: [["createdAt", "DESC"]]
      });
    return res.status(200).json(posts)
})

postsRouter.get("/all/following/:username",async(req,res)=>{
    const posts = await Post.findAll({include:[{model:User,attributes:["username"]}]})
    return res.status(200).json(posts)
    /*change this*/
})

postsRouter.post("/new",getToken,async(req,res)=>{
    try {
        const user = req.user
        const postContent = req.body.content
        if(postContent.length < 5 || postContent.length > 300){ 
            return res.status(400).send("Post content must be between 5 and 300 characters long")
        }
        const newPost = await Post.create({content:postContent,userId:user.id,username:user.username})
        return res.status(200).send(newPost)
    } catch (error) {
        console.log(error)
    }
})
postsRouter.post("/edit/:postId",getToken,async(req,res)=>{
    try {
        const user = req.user
        const postId = req.params.postId
        const post = await Post.findByPk(postId,{include:User})
        if(post.user.id == user.id){
            post.content = req.body.editPostContent
            await post.save()
            return res.status(200).send("Post saved")
        } else{
            return res.status(400).send("You are not the owner of that post")
        }
    } catch (error) {
        console.log(error)
    }
})
postsRouter.delete("/:postId",getToken,async(req,res)=>{
    try {
        const user = req.user
        const postId = req.params.postId
        const post = await Post.findByPk(postId,{include:User})
        if(post.user.id == user.id){
            await post.destroy()
            return res.status(200).send("Post deleted")
        } else{
            return res.status(400).send("You are not the owner of that post")
        }
    } catch (error) {
        console.log(error)
    }
})
postsRouter.delete("/comment/:commentId",getToken,async(req,res)=>{
    try {
        const user = req.user
        const commentId = req.params.commentId
        const comment = await Comment.findByPk(commentId,{include:User})
        if(comment.user.id == user.id){
            await comment.destroy()
            return res.status(200).send("Comment deleted")
        } else{
            return res.status(400).send("You are not the owner of that post")
        }
    } catch (error) {
        console.log(error)
    }
})
postsRouter.post("/comment/:postId",getToken,async(req,res)=>{
    try {
        const user = req.user
        const postId = req.params.postId
        const post = await Post.findByPk(postId)
        if(!post) return res.status(400).send("Invalid post id")
        const description = req.body.description
        if(description.length < 5 || description.length > 300){
            return res.status(400).send("Comment too short/too long (<5 or >300)")
        }
        const comment = await Comment.create({description,userId:user.id,postId:post.id})
        return res.status(200).send(comment)
    } catch (error) {
        console.log(error)
    }
})

module.exports = postsRouter