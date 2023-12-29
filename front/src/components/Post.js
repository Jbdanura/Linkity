import React, { useState,useEffect } from 'react'
import "./Post.css"
import UserIcon from "../images/user.png"
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import Comment from './Comment'
import Comments from './Comments'

const Post = ({post,user}) => {
  const [editPost,setEditPost] = useState(false)
  const [editPostContent,setEditPostContent] = useState(post.content)
  const navigate = useNavigate()

  const doEditPost = async () => {
    try {
      const result = await axios.post(`https://linkity.onrender.com/posts/edit/${post.id}`,{editPostContent},{headers:{"Authorization":`Bearer ${user.token}`}})
      window.location.reload()
    } catch (error) {
      
    }
  }

  const doDeletePost = async () => {
    try {
      const result = await axios.delete(`https://linkity.onrender.com/posts/${post.id}`,{headers:{"Authorization":`Bearer ${user.token}`}})
      window.location.reload()
    } catch (error) {
      
    }
  }

  return (
    <div className="post">
      <div className="post-info">
        <img className="post-icon" src={UserIcon}/>
        <p onClick={()=>navigate(`/user/${post.username}`)}>{post.username}</p>
        <div class="clearfix"></div>
        {post.username == user.username && <div className="post-config">
          <button className="edit-post" onClick={()=>setEditPost(!editPost)}>Edit</button>
          <button className="delete-post" onClick={()=>doDeletePost()}>Delete</button>
        </div>}
      </div>
      <div className="post-content">
        {editPost ? <><input className="edit-post-input" value={editPostContent} onChange={(e)=>setEditPostContent(e.target.value)}></input>
        <button className="submit-edit-post" onClick={()=>doEditPost()}>Save</button> </>:
        <p>{post.content}</p>
        }
      </div>
      <Comment user={user} post={post}/>
      <Comments user={user} post={post}/>
    </div>
  )
}

export default Post