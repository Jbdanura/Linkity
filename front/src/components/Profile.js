import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Profile = ({user}) => {
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

  if(userData.length < 1) return <div>not found</div>
  
  return (
  <div>found {username}</div>
  )
}

export default Profile