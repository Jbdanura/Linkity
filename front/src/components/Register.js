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
        <h1>Linkity</h1>
        <form className="register-form" onSubmit={(e)=>register(e)}>
          <h2 className={errorMessage  ? 'showErrorMessage' : 'hideErrorMessage'}>{errorMessage}</h2>
          <h2 className={successMessage  ? 'showSuccessMessage' : 'hideSuccessMessage'}>{successMessage}</h2>
            <label htmlFor="username">Username</label>
            <input id="username" type="text" placeholder="Enter username" value={username} onChange={(e)=>setUsername(e.target.value)}></input>
            <label htmlFor="email">Email</label>
            <input id="email" type="text" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}></input>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
            <label htmlFor="confirm-password">Confirm password</label>
            <input id="confirm-password" type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></input>
            <button className="register-btn" type="submit">REGISTER</button>
        </form>
        <p>Already have an account? <a href="#" onClick={()=>setLogin(true)}>Log in</a></p>
    </div>
  )
}

export default Register