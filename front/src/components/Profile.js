import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import "./Profile.css"
import Home from './Home'

const Profile = ({user,logout,baseUrl}) => {
  const username = useParams().username
  const [userData,setUserData] = useState([])
  const navigate = useNavigate()

  const getUserData = async(setUserData)=>{
    try {
      const data = await axios.get(`${baseUrl}/users/user/${username}`)
      setUserData(data.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getUserData(setUserData)
  },[username])

  if(!user) return null

  return (
      <div className="profile-found">
         {userData ? <Home user={user} logout={logout} userData={userData} baseUrl={baseUrl} getUserData={getUserData} setUserData={setUserData}/> 
         : <Home user={user} logout={logout} notFound={true} baseUrl={baseUrl}/>
         }
      </div>
  )
}

export default Profile