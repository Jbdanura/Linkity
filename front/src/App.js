import './App.css';
import {BrowserRouter, Routes,Route, useNavigate} from "react-router-dom"
import { useState,useEffect } from 'react';
import HomeUnlogged from "./components/HomeUnlogged"
import Home from './components/Home';
import Profile from "./components/Profile"

function App() {
  const [user,setUser] = useState(null)
  const logout = () =>{
    setUser(null)
    localStorage.removeItem("user")
  }
  useEffect(()=>{
    const loggedUser = localStorage.getItem("user")
    if(loggedUser){
      const foundUser = JSON.parse(loggedUser)
      setUser(foundUser)
    }
  },[])
  console.log(user)
  return (
    <div className="App">
      <BrowserRouter>
        {!user && <HomeUnlogged setUser={setUser}/> }
        <Routes>
          <Route path="/" element={<Home user={user} logout={logout}/>}></Route>
          <Route path="/user/:username" element={<Profile user={user} logout={logout}/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
