import React, { useState,useEffect } from 'react'
import "./Post.css"
import UserIcon from "../images/user.png"
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import Comment from './Comment'
import Comments from './Comments'
import { Image,Transformation } from 'cloudinary-react';

const Post = ({post,user,baseUrl,getPosts,showAllPosts,setHomePosts,getUserData,setUserData}) => {
  const [editPost,setEditPost] = useState(false)
  const [editPostContent,setEditPostContent] = useState(post.content)
  const [likesModal,setLikesModal] = useState(false)
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

  const handleImageError = () => {
  };

  return (
    <div className="post">
      <div className="post-info">
          <Image
            key={`${post.username}`}
            cloudName="dchytnqhl"
            onClick={()=>navigate(`/user/${post.username}`)}
            publicId={`linkity/${post.username}`}
            crop="scale"
            defaultImage="0.jpg"
            className="post-icon"
          ></Image>
        <p onClick={()=>navigate(`/user/${post.username}`)}>{post.username}</p>
        <div class="clearfix"></div>
        {post.username == user.username && <div className="post-config">
          <button className="edit-post" onClick={()=>setEditPost(!editPost)}>Edit</button>
          <button className="delete-post" onClick={()=>doDeletePost()}>Delete</button>
        </div>}
      </div>
      <div className="post-content">
        {editPost ? <><input className="edit-post-input" value={editPostContent} onChange={(e)=>setEditPostContent(e.target.value)}></input>
        <button className="submit-edit-post" onClick={()=>doEditPost()}>Save</button> </>:<>
                    <Image
                    key={post.id}
                    cloudName="dchytnqhl"
                    className="post-content-image"
                    publicId={`linkity/${post.id}`}
                    crop="scale"
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; 
                      currentTarget.remove()
                    }}
                > </Image>
        <p>{post.content}</p></>
        }
      </div>
      <div className="like-post">
        {post.Likes.some((like) => like.userId === user.id) ? <button className="unlike-post-btn" onClick={()=>{likePost(); getPosts(showAllPosts,setHomePosts);
              if(getUserData){
                getUserData(setUserData)
              }
        }}>❤</button>
         : <button className="like-post-btn" onClick={()=>{likePost();getPosts(showAllPosts,setHomePosts);
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
                                <Image
                                  key={`${like.user.username}`}
                                  cloudName="dchytnqhl"
                                  onClick={()=>navigate(`/user/${like.user.username}`)}
                                  publicId={`linkity/${like.user.username}`}
                                  crop="scale"
                                  defaultImage="0.jpg"
                              > </Image>
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