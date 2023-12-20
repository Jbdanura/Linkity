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
      const data = await axios.get(`http://localhost:777/users/user/${username}`)
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
    <>
      {(userData.length < 1) ?
      navigate("/not-found"):
      <div className="profile-found">
         <Home user={user} logout={logout} userData={userData}/>
      </div>}
    </>
  )
}

export default Profile