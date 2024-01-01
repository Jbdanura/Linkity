import React,{useState} from 'react'
import "./HomeUnlogged.css"
import Register from './Register'
import Login from './Login'

const HomeUnlogged = ({setUser,baseUrl}) => {
  const [login,setLogin] = useState(false)
  
  return (
    <div className="homeUnlogged">
      <Login setLogin={setLogin} setUser={setUser} baseUrl={baseUrl}/>
      <Register setLogin={setLogin} baseUrl={baseUrl}/>
    </div>
  )
}

export default HomeUnlogged