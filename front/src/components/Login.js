import React,{useState} from 'react'
import "./RegisterLogin.css"
import axios from "axios"

const Login = ({setLogin,setUser}) => {
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [errorMessage,setErrorMessage] = useState("")
  const [successMessage,setSuccessMessage] = useState("")

  const login = async (e) => {
    try {
      e.preventDefault()
      const result = await axios.post("http://localhost:777/users/login",{username,password},{})
      setSuccessMessage(`Logged in`)
      setTimeout(()=>{
        setSuccessMessage(null)
        setUser(result.data)
        console.log(result.data)
        localStorage.setItem("user", JSON.stringify(result.data));
      },1500)
    } catch (error) {
      setErrorMessage(error.response.data)
      setTimeout(()=>{
        setErrorMessage(null)
      },3000)
    }
  }

  return (
    <div className="login">
        <h1>Linkity</h1>
        <form className="login-form" onSubmit={(e)=>login(e)}>
          <h2 className={errorMessage  ? 'showErrorMessage' : 'hideErrorMessage'}>{errorMessage}</h2>
          <h2 className={successMessage  ? 'showSuccessMessage' : 'hideSuccessMessage'}>{successMessage}</h2>
            <input id="username" type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)}></input>
            <input id="password" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
            <button className="login-btn" type="submit">LOGIN</button>
        </form>
    </div>
  )
}

export default Login