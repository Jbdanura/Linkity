import React,{useState} from 'react'
import "./NewPost.css"
import UserIcon from "../images/user.png"
import axios from "axios"

const NewPost = ({user}) => {
  const [content,setContent] = useState("")
  const [errorMessage,setErrorMessage] = useState("")
  const [successMessage,setSuccessMessage] = useState("")

  const createPost = async (e) => {
    try {
        e.preventDefault()
        const post = await axios.post("http://localhost:777/posts/new",{content},{headers:{"Authorization":`Bearer ${user.token}`}})
        setSuccessMessage("Published post")
        setContent("")
        setInterval(()=>{
          setSuccessMessage(null)
          window.location.reload()
        },1000)
    } catch (error) {
        if(error.response.data){
          setErrorMessage(error.response.data)
          setInterval(()=>{
            setErrorMessage(null)
          },2500)
        }
    }
  }

  return (
    <form className="new-post" onSubmit={(e)=>createPost(e)}>
        <h2 className={errorMessage  ? 'showErrorMessage' : 'hideErrorMessage'}>{errorMessage}</h2>
        <h2 className={successMessage  ? 'showSuccessMessage' : 'hideSuccessMessage'}>{successMessage}</h2>
        <img src={UserIcon}/>
        <div className="new-post-info">
            <input placeholder="Your post here..." onChange={(e)=>setContent(e.target.value)} value={content}></input>
        </div>
    </form>
  )
}

export default NewPost