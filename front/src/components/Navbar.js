import React from 'react'
import "./Navbar.css"
import {useNavigate} from "react-router-dom"

const Navbar = ({user,logout}) => {
  const navigate = useNavigate()

  return (
    <div className="navbar">
        <div className="navbar-left">
            <button className="home" onClick={()=>navigate("/")}>Home</button>
        </div>
        <input placeholder="Search..."/>
        <div className="navbar-right">
            <button className="my-profile" onClick={()=>navigate(`/user/${user.username}`)}>My profile</button>
            <button className="logout" onClick={()=>logout()}>Logout</button>
        </div>
    </div>
  )
}

export default Navbar