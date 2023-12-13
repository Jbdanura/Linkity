import React,{useState} from 'react'
import "./HomeUnlogged.css"
import Register from './Register'
import Login from './Login'

const HomeUnlogged = ({setUser}) => {
  const [login,setLogin] = useState(false)
  
  return (
    <div className="homeUnlogged">
      <Login setLogin={setLogin} setUser={setUser}/>
      <Register setLogin={setLogin}/>
    </div>
  )
}

export default HomeUnlogged