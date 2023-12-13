import React from 'react'
import "./Post.css"


const Post = ({post}) => {
  return (
    <div className="post-container">
        <div className="post-info">
          {console.log(post)}
          <div className="post-info-left">
          {post.user.username}
          </div>
          <div className="post-info-right">
            {post.createdAt.splice(0,12)}
          </div>
        </div>
        <div className="post-description">
          description
        </div>
    </div>
  )
}

export default Post