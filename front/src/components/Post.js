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
  const [likesModal,setLikesModal] = useState(false)
  const [isLiked,setIsLiked] = useState(post.Likes.some((like) => like.userId === user.id))
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
  const likePost = async () => {
    try {
      const result = await axios.post(`${baseUrl}/posts/like/${post.id}`,{},{headers:{"Authorization":`Bearer ${user.token}`}})
    } catch (error) {}
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
      <div className="like-post">
        {isLiked ? <button className="unlike-post-btn" onClick={()=>{likePost();setIsLiked(false); getPosts(showAllPosts,setHomePosts);
              if(getUserData){
                getUserData(setUserData)
              }
        }}>❤</button>
         : <button className="like-post-btn" onClick={()=>{likePost();setIsLiked(true); getPosts(showAllPosts,setHomePosts);
          if(getUserData){
            getUserData(setUserData)
          }
         }}>❤</button>}
        <button className="show-likes" onClick={()=>setLikesModal(!likesModal)}>{post.Likes.length}</button>
      </div>
      {likesModal && (
        <div className="modal-home">
          <div className="modal-home-content">
            <span className="modal-home-close" onClick={()=>setLikesModal(false)}>&times;</span>
            <h2>Likes</h2>
            {post.Likes && post.Likes.map(like=>{
                      return <div className="modal-home-follower">
                              <img src={UserIcon}/>
                              <h4 onClick={()=>{navigate(`/user/${like.user.username}`);setLikesModal(false)}}>{like.user.username}</h4>
                      </div>
                  })}
          </div>
        </div>
      )}
      <Comment user={user} post={post} baseUrl={baseUrl} getPosts={getPosts} showAllPosts={showAllPosts} setHomePosts={setHomePosts}/>
      <Comments user={user} post={post} baseUrl={baseUrl} getPosts={getPosts} showAllPosts={showAllPosts} setHomePosts={setHomePosts}/>
    </div>
  )
}

export default Post