import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import "./Profile.css"
import Home from './Home'

const Profile = ({user,logout}) => {
  const username = useParams().username
  const [userData,setUserData] = useState([])
  const navigate = useNavigate()

  const getUserData = async()=>{
    try {
      const data = await axios.get(`https://linkity.onrender.com/users/user/${username}`)
      setUserData(data.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getUserData()
  },[username])

  if(!user) return null

  return (
      <div className="profile-found">
         {userData ? <Home user={user} logout={logout} userData={userData}/> 
         : <Home user={user} logout={logout} notFound={true}/>
         }
      </div>
  )
}

export default Profile