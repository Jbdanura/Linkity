import React from 'react'

const Post = ({post}) => {
  return (
    <div className="post-container">
        {post.content} by {post.user.username}
    </div>
  )
}

export default Post