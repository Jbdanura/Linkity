import React, { useState, useEffect } from 'react'
import "./RecommendedUser.css"
import axios from "axios"
import userAvatar from "../images/user.png"

const Recommended = ({recommendedModal, setRecommendedModal}) => {
  const [users,setUsers] = useState("")

  const getUsers = async() => {
    const data = await axios.get("http://localhost:777/users/recommended")
    setUsers(data.data)
  }

  useEffect(()=>{
    getUsers()
  },[])

  console.log(users)

  return (
    <div className={recommendedModal ? "recommended-modal-container" : "recommended-container"}>
        <h3>Recommended users</h3>
        {recommendedModal && <button className="close" onClick={()=>setRecommendedModal(false)}>X</button>}
        <div className="recommended-users">
            {users && users.map(recommendedUser=>{
                return <div className="recommended-user">
                    <div className="recommended-user-info">
                        <img src={userAvatar}/>
                        <h4>@{recommendedUser.username}</h4>
                    </div>
                    <button>Follow</button>
                </div>
            })}
        </div>
    </div>
  )
}

export default Recommended