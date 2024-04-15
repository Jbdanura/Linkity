import './App.css';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useState,useEffect } from 'react';
import HomeUnlogged from "./components/HomeUnlogged"
import Home from './components/Home';
import Profile from "./components/Profile";
import Configuration from "./components/Configuration";
import NotFound from './components/NotFound';


function App() {
  const [user,setUser] = useState(null)
  const baseUrl = "https://linkity.onrender.com"

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

  return (
    <div className="App">
      <Router>
        {!user && <HomeUnlogged setUser={setUser} baseUrl={baseUrl}/> }
        <Routes>
          <Route path="/" element={<Home user={user} logout={logout} baseUrl={baseUrl}/>}></Route>
          <Route path="/not-found" element={<NotFound user={user} logout={logout} baseUrl={baseUrl}/>}></Route>
          <Route path="/user/:username" element={<Profile user={user} logout={logout} baseUrl={baseUrl}/>}></Route>
          <Route path="/configuration" element={<Configuration user={user} logout={logout} baseUrl={baseUrl}/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
