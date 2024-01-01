import React,{useState} from 'react'
import axios from "axios"
import "./Comment.css"

const Comment = ({user,post,baseUrl,getPosts,showAllPosts,setHomePosts}) => {
  const [description,setDescription] = useState("")
  const newComment = async(e) =>{
    try {
        e.preventDefault()
        if(description.length > 300 || description.length < 5) alert("Comment too short/long")
        const result = await axios.post(`${baseUrl}/posts/comment/${post.id}`,{description},
        {headers:{"Authorization":`Bearer ${user.token}`}})
        getPosts(showAllPosts,setHomePosts)
        setDescription("")
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