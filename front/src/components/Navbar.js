import React,{useState} from 'react'
import "./Navbar.css"
import {useNavigate} from "react-router-dom"
import UserIcon from "../images/user.png"
import { Image,Transformation } from 'cloudinary-react';

const Navbar = ({user,logout,baseUrl}) => {
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
            <button className="home" onClick={()=>navigate("/")}><i class="fa fa-home"></i> Home</button>
        </div>
        <input placeholder="Search..." value={search} onChange={(e)=>setSearch(e.target.value)} onKeyDown={handleKeyDown}/>
        <div className="navbar-right">
            <Image
                key={`${user.username}-${Date.now()}`}
                cloudName="dchytnqhl"
                className="my-profile"
                onClick={()=>navigate(`/user/${user.username}`)}
                publicId={`linkity/${user.username}`}
                crop="scale"
                defaultImage="0.jpg"
            > </Image>
            <button className="config" onClick={()=>navigate(`/configuration`)}><i class="fa fa-cog" aria-hidden="true"></i></button>
            <button className="logout" onClick={()=>{logout();navigate("/")}}><i class="fa fa-sign-out" aria-hidden="true"></i></button>
        </div>
    </div>
  )
}

export default Navbar