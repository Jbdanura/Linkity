import React, { useState } from 'react'
import "./Post.css"
import UserIcon from "../images/user.png"
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const Post = ({post,userData,user}) => {
  const [editPost,setEditPost] = useState(false)
  const [editPostContent,setEditPostContent] = useState(post.content)
  const navigate = useNavigate()

  const doEditPost = async () => {
    try {
      const result = await axios.post(`http://localhost:777/posts/edit/${post.id}`,{editPostContent},{headers:{"Authorization":`Bearer ${user.token}`}})
      window.location.reload()
    } catch (error) {
      
    }
  }

  const doDeletePost = async () => {
    try {
      const result = await axios.delete(`http://localhost:777/posts/${post.id}`,{headers:{"Authorization":`Bearer ${user.token}`}})
      window.location.reload()
    } catch (error) {
      
    }
  }
  return (
    <div className="post">
      <div className="post-info">
        <img className="post-icon" src={UserIcon}/>
        <p onClick={()=>navigate(`/user/${userData.username}`)}>{userData.username}</p>
        <div class="clearfix"></div>
        {userData.username == user.username && <div className="post-config">
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
    </div>
  )
}

export default Post