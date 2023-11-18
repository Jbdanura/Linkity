import './App.css';
import {BrowserRouter, Routes,Route} from "react-router-dom"
import { useState,useEffect } from 'react';
import HomeUnlogged from "./components/HomeUnlogged"
import Home from './components/Home';

function App() {
  const [user,setUser] = useState(null)

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
        {!user ? <HomeUnlogged setUser={setUser}/> :
        <Home user={user}/>}
      </BrowserRouter>
    </div>
  );
}

export default App;
