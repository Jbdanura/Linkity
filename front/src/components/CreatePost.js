import React from 'react';
import "./CreatePost.css";
import axios from "axios"
import { useState } from 'react';

const CreatePost = ({user}) => {
  const [content,setContent] = useState("")
  const [errorMsg,setErrorMsg] = useState(null)
  const [msg,setMsg] = useState(null)

  const createPost = async (e) => {
    try {
        e.preventDefault()
        const post = await axios.post("http://localhost:777/posts/new",{content},{headers:{"Authorization":`Bearer ${user.token}`}})
        setMsg("Published post")
        setContent("")
        setInterval(()=>{
          setMsg(null)
        },2000)
    } catch (error) {
        console.log(error)
        if(error.response.data){
          setErrorMsg(error.response.data)
          setInterval(()=>{
            setErrorMsg(null)
          },2500)
        }
    }
  }

  return (
    <form className="create-post" onSubmit={(e)=>createPost(e)}>
        {errorMsg && <p>{errorMsg}</p>}
        {msg && <p>{msg}</p>}
        <textarea onChange={(e)=>setContent(e.target.value)} value={content} placeholder="Your post content here..."></textarea>
        <button>Post</button>
    </form>
  )
}

export default CreatePost