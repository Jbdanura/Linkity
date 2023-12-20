import React from 'react'
import "./Post.css"
import UserIcon from "../images/user.png"

const Post = ({post,userData}) => {
  return (
    <div className="post">
      <div className="post-info">
        <img className="post-icon" src={UserIcon}/>
        <p>{userData.username}</p>
      </div>
      <div className="post-content">
        <p>{post.content}</p>
      </div>
    </div>
  )
}

export default Post