import React, { useState,useEffect } from 'react'
import "./Post.css"
import UserIcon from "../images/user.png"
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import Comment from './Comment'
import Comments from './Comments'

const Post = ({post,user,baseUrl,getPosts,showAllPosts,setHomePosts,getUserData,setUserData}) => {
  const [editPost,setEditPost] = useState(false)
  const [editPostContent,setEditPostContent] = useState(post.content)
  const navigate = useNavigate()

  const doEditPost = async () => {
    try {
      const result = await axios.post(`${baseUrl}/posts/edit/${post.id}`,{editPostContent},{headers:{"Authorization":`Bearer ${user.token}`}})
      getPosts(showAllPosts,setHomePosts)
      if(getUserData){
        getUserData(setUserData)
      }
      setEditPost(false)
    } catch (error) {}
  }

  const doDeletePost = async () => {
    try {
      const result = await axios.delete(`${baseUrl}/posts/${post.id}`,{headers:{"Authorization":`Bearer ${user.token}`}})
      alert("Deleted post!")
      getPosts(showAllPosts,setHomePosts)
      if(getUserData){
        getUserData(setUserData)
      }
    } catch (error) { }
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
      <Comment user={user} post={post} baseUrl={baseUrl} getPosts={getPosts} showAllPosts={showAllPosts} setHomePosts={setHomePosts}/>
      <Comments user={user} post={post} baseUrl={baseUrl} getPosts={getPosts} showAllPosts={showAllPosts} setHomePosts={setHomePosts}/>
    </div>
  )
}

export default Post