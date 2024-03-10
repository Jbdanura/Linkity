import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import "./Profile.css"
import Home from './Home'

const Profile = ({user,logout,baseUrl}) => {
  const username = useParams().username
  const [userData,setUserData] = useState(null)
  const navigate = useNavigate()

  const getUserData = async(setUserData)=>{
    try {
      const data = await axios.get(`${baseUrl}/users/user/${username}`)
      setUserData(data.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (username && username !== userData?.username) {
      getUserData(setUserData);
    }
  }, [username, userData]);

  if(!user) return null

  return (
      <div className="profile-found">
         {userData != null ? <Home user={user} logout={logout} userData={userData} baseUrl={baseUrl} getUserData={getUserData} setUserData={setUserData}/> 
         : <Home user={user} logout={logout} notFound={true} baseUrl={baseUrl}/>
         }
      </div>
  )
}

export default Profile