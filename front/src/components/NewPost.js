import React,{useState} from 'react'
import "./NewPost.css"
import UserIcon from "../images/user.png"
import axios from "axios"
import { Image,Transformation } from 'cloudinary-react';


const NewPost = ({user,baseUrl,getPosts,showAllPosts,setHomePosts,getUserData,setUserData}) => {
  const [content,setContent] = useState("")
  const [errorMessage,setErrorMessage] = useState("")
  const [successMessage,setSuccessMessage] = useState("")
  const [fileInputState, setFileInputState] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [fileReady,setFileReady] = useState('');

  const handleFileInputChange = (e) => {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFileInputState(e.target.value);
      if (!file) return; 
      const reader = new FileReader();
      reader.readAsDataURL(file); 
      reader.onloadend = () => {
          setFileReady(reader.result)
      };
  };

  const createPost = async (e) => {
    try {
        e.preventDefault()
        const post = await axios.post(`${baseUrl}/posts/new`,{content,fileReady},{headers:{"Authorization":`Bearer ${user.token}`}})
        setSuccessMessage("Published post")
        setContent("")
        setFileInputState("")
        setSelectedFile("")
        setFileReady("")
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
        <Image
            key={`${user.username}`}
            cloudName="dchytnqhl"
            publicId={`linkity/${user.username}`}
            crop="scale"
            defaultImage="0.jpg"
            > </Image>
        <div className="new-post-info">
            <input placeholder="Your post here..." className="post-new-content" onChange={(e)=>setContent(e.target.value)} value={content}>   
            </input>
            <button type="submit">+</button>
            <input
                type="file"
                name="image"
                onChange={handleFileInputChange}
                value={fileInputState}
                className="post-new-img"
            />
        </div>
    </form>
  )
}

export default NewPost