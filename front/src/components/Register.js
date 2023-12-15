import React,{useState} from 'react'
import "./RegisterLogin.css"
import axios from "axios"

const Register = ({setLogin}) => {
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [confirmPassword,setConfirmPassword] = useState("")
  const [email,setEmail] = useState("")
  const [errorMessage,setErrorMessage] = useState("")
  const [successMessage,setSuccessMessage] = useState("")

  const register = async (e) => {
    try {
      e.preventDefault()
      if(password !== confirmPassword){
        setErrorMessage("Passwords dont match")
        setTimeout(()=>{
          setErrorMessage(null)
        },3000)
        return
      }
      const result = await axios.post("http://localhost:777/users/register",{username,email,password},{})
      setSuccessMessage(`Created user ${result.data.username}`)
      setTimeout(()=>{
        setSuccessMessage(null)
        setLogin(true)
      },1500)
      setUsername("")
      setPassword("")
      setConfirmPassword("")
      setEmail("")
    } catch (error) {
      setErrorMessage(error.response.data)
      setTimeout(()=>{
        setErrorMessage(null)
      },3000)
      console.log(error)
    }
  }

  return (
    <div className="register">
        <div className="register-text">
          <h1>Linkity</h1>
          <h3>Connect with people</h3>
        </div>
        <form className="register-form" onSubmit={(e)=>register(e)}>
          <p>Dont have an account? Register now!</p>
          <h2 className={errorMessage  ? 'showErrorMessage' : 'hideErrorMessage'}>{errorMessage}</h2>
          <h2 className={successMessage  ? 'showSuccessMessage' : 'hideSuccessMessage'}>{successMessage}</h2>
            <input id="username" type="text" placeholder="Enter username" value={username} onChange={(e)=>setUsername(e.target.value)}></input>
            <input id="email" type="text" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
            <input id="password" type="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
            <input id="confirm-password" type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></input>
            <button className="register-btn" type="submit">REGISTER</button>
        </form>
    </div>
  )
}

export default Register