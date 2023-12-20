const postsRouter = require("express").Router()
const User = require("../models/user.js")
const Post = require("../models/post.js")
const getToken = require("../middleware/token.js")

postsRouter.get("/all",async(req,res)=>{
    const posts = await Post.findAll({include:[{model:User,attributes:["username"]}]})
    return res.status(200).json(posts)
})

postsRouter.post("/new",getToken,async(req,res)=>{
    try {
        const user = req.user
        console.log(user.id)
        const postContent = req.body.content
        if(postContent.length < 5 || postContent.length > 300){ 
            return res.status(400).send("Post content must be between 5 and 300 characters long")
        }
        const newPost = await Post.create({content:postContent,userId:user.id})
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
            post.content = req.body.postContent
            await post.destroy()
            return res.status(200).send("Post deleted")
        } else{
            return res.status(400).send("You are not the owner of that post")
        }
    } catch (error) {
        console.log(error)
    }
})
module.exports = postsRouter