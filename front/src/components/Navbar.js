import React,{useState} from 'react'
import "./Navbar.css"
import {useNavigate} from "react-router-dom"

const Navbar = ({user,logout}) => {
  const navigate = useNavigate()
  const [search,setSearch] = useState("")
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      navigate(`/user/${search}`)
    }
  }
  return (
    <div className="navbar">
        <div className="navbar-left">
            <button className="home" onClick={()=>navigate("/")}>Home</button>
        </div>
        <input placeholder="Search..." value={search} onChange={(e)=>setSearch(e.target.value)} onKeyDown={handleKeyDown}/>
        <div className="navbar-right">
            <button className="my-profile" onClick={()=>navigate(`/user/${user.username}`)}>My profile</button>
            <button className="logout" onClick={()=>{logout();navigate("/")}}>Logout</button>
        </div>
    </div>
  )
}

export default Navbar