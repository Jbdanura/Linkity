import React,{useState} from 'react'
import axios from "axios"
import "./Comment.css"

const Comment = ({user,post}) => {
  const [description,setDescription] = useState("")
  const newComment = async(e) =>{
    try {
        e.preventDefault()
        const result = await axios.post(`http://localhost:777/posts/comment/${post.id}`,{description},
        {headers:{"Authorization":`Bearer ${user.token}`}})
        window.location.reload()
    } catch (error) {
    }
  }
  return (
    <form className="comment-container" onSubmit={(e)=>newComment(e)}>
        <h3>Comments</h3>
        <input value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='Your comment here...'></input>
        <button>+</button>
    </form>
  )
}

export default Comment