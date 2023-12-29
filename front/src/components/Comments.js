import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Comments.css"
import axios from "axios"

const Comments = ({user,post}) => {
  const navigate = useNavigate()

  const deleteComment = async (id) => {
    try {
      const result = await axios.delete(`https://linkity.onrender.com/posts/comment/${id}`,{headers:{"Authorization":`Bearer ${user.token}`}})
      console.log(result)
      window.location.reload()
    } catch (error) {
    }
  }

  return (
    <div className="comments-container">
        {post.Comments && post.Comments.length > 0 && post.Comments.map(comment=>{
            const commentId = comment.id
            return <div className="comment">
                <p className="comment-user" onClick={()=>navigate(`/user/${comment.user.username}`)}>@{comment.user.username}</p>
                {user.username === comment.user.username && <button onClick={()=>deleteComment(commentId)} className="delete-comment">Delete</button>}
                <p className="comment-content">{comment.description}</p>
            </div>
        })}
    </div>
  )
}

export default Comments