import React,{useState} from 'react'
import "./HomeUnlogged.css"
import Register from './Register'
import Login from './Login'

const HomeUnlogged = ({setUser}) => {
  const [login,setLogin] = useState(false)
  
  return (
    <div className="homeUnlogged">
      {!login ? <Register setLogin={setLogin}/> : <Login setLogin={setLogin} setUser={setUser}/>}
    </div>
  )
}

export default HomeUnlogged