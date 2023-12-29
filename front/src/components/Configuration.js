import React, { useState } from 'react'
import Navbar from './Navbar'
import "./Configuration.css"
import axios from "axios"

const Configuration = ({user,logout}) => {

  const[newPassword,setNewPassword] = useState("")
  const[oldPassword,setOldPassword] = useState("")
  const [errorMessage,setErrorMessage] = useState("")
  const [successMessage,setSuccessMessage] = useState("")

  const changePassword = async (e) => {
    try {
        e.preventDefault()
        const username = user.username
        const post = await axios.post("https://linkity.onrender.com/users/changePassword",{oldPassword,newPassword,username},{headers:{"Authorization":`Bearer ${user.token}`}})
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
        <Navbar user={user} logout={logout}/>
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