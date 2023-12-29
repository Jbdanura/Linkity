import React, { useState, useEffect } from 'react'
import "./RecommendedUser.css"
import axios from "axios"
import userAvatar from "../images/user.png"
import { useNavigate } from 'react-router-dom'

const Recommended = ({recommendedModal, setRecommendedModal,user}) => {
  const [users,setUsers] = useState("")
  const navigate = useNavigate()

  const getUsers = async() => {
    const data = await axios.get("https://linkity.onrender.com/users/recommended")
    setUsers(data.data)
  }

  useEffect(()=>{
    getUsers()
  },[])


  return (
    <div className={recommendedModal ? "recommended-modal-container" : "recommended-container"}>
        <h3>Recommended users</h3>
        {recommendedModal && <button className="close" onClick={()=>setRecommendedModal(false)}>X</button>}
        <div className="recommended-users">
            {users && users.map(recommendedUser=>{
                if(recommendedUser.username == user.username) return null
                return <div className="recommended-user">
                    <div className="recommended-user-info">
                        <img src={userAvatar}/>
                        <h4 onClick={()=>navigate(`/user/${recommendedUser.username}`)}>@{recommendedUser.username}</h4>
                    </div>
                </div>
            })}
        </div>
    </div>
  )
}

export default Recommended