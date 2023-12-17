import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import "./Profile.css"
import Home from './Home'

const Profile = ({user,logout}) => {
  const username = useParams().username
  const [userData,setUserData] = useState([])
  const getUserData = async()=>{
    try {
      const data = await axios.get(`http://localhost:777/users/user/${username}`)
      setUserData(data.data)
      console.log(data,userData)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getUserData()
  },[username])

  if(!user) return null
  if(userData.username == user.username) return <Home user={user} logout={logout}/>
  return (
    <>
      {(userData.length < 1) ?
      <Home user={user} logout={logout} notFound={username}/> :
      <div className="profile-found">
         <Home user={user} logout={logout} userData={userData}/>
      </div>}
    </>
  )
}

export default Profile