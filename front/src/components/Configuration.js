import React, { useState } from 'react'
import Navbar from './Navbar'
import "./Configuration.css"
import axios from "axios"

const Configuration = ({user,logout,baseUrl}) => {

  const [newPassword,setNewPassword] = useState("")
  const [oldPassword,setOldPassword] = useState("")
  const [errorMessage,setErrorMessage] = useState("")
  const [successMessage,setSuccessMessage] = useState("")
  const [fileInputState, setFileInputState] = useState('');
  const [selectedFile, setSelectedFile] = useState();

  const handleFileInputChange = (e) => {
      const file = e.target.files[0];
      console.log(e.target.files)
      setSelectedFile(file);
      setFileInputState(e.target.value);
  };

  const handleSubmitFile = (e) => {
      e.preventDefault();
      if (!selectedFile) return;
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
          uploadImage(reader.result);
      };
      reader.onerror = () => {
          console.error('Error submitting file');
          setTimeout(()=>{
            setErrorMessage(null)
          },3000)
      };
  };

  const uploadImage = async (base64EncodedImage) => {
      try {
          const response = await fetch(`${baseUrl}/users/uploadImage`, {
              method: 'POST',
              body: JSON.stringify({ data: base64EncodedImage }),
              headers: { 'Content-Type': 'application/json', 'Authorization':`Bearer ${user.token}`},
          });
          if (!response.ok){
            setErrorMessage('Error uploading image');
            setTimeout(()=>{
              setErrorMessage(null)
            },3000)
            return
          }
          setFileInputState('');
          setSuccessMessage('Image uploaded');
          setTimeout(()=>{
            setSuccessMessage(null)
            window.location.reload()
          },2000)
      } catch (err) {
          setErrorMessage('Error uploading image');
          setTimeout(()=>{
            setErrorMessage(null)
          },3000)
      }
  };

  const changePassword = async (e) => {
    try {
        e.preventDefault()
        const username = user.username
        const post = await axios.post(`${baseUrl}/users/changePassword`,{oldPassword,newPassword,username},{headers:{"Authorization":`Bearer ${user.token}`}})
        setSuccessMessage("Password changed")
        setTimeout(()=>{
          setSuccessMessage(null)
        },2000)
    } catch (error) {
        if(error.response.data){
          setErrorMessage(error.response.data)
          setTimeout(()=>{
            setErrorMessage(null)
          },3000)
        }
    }
  }


  if(!user) return null

  return (
    <div>
        <Navbar user={user} logout={logout} baseUrl={baseUrl}/>
        <div className="change-pic">
          <h4>Change your profile picture</h4>
            <form onSubmit={handleSubmitFile}>
                <input
                    type="file"
                    name="image"
                    onChange={handleFileInputChange}
                    value={fileInputState}
                />
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
        <div className="configuration-container">
            <h4>Change your password</h4>
            <h2 className={errorMessage  ? 'showErrorMessage' : 'hideErrorMessage'}>{errorMessage}</h2>
            <h2 className={successMessage  ? 'showSuccessMessage' : 'hideSuccessMessage'}>{successMessage}</h2>
            <form onSubmit={(e)=>changePassword(e)}>
                <input value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} placeholder="Current password..." type="password"/>
                <input value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} placeholder="New password..." type="password"/>
                <button>Change</button>
            </form>
        </div>
    </div>
  )
}

export default Configuration