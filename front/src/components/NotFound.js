import React from 'react'
import Navbar from './Navbar'
import "./NotFound.css"

const NotFound = ({user,logout}) => {
  return (
    <>
    <Navbar user={user} logout={logout}/>
    <h1 className="not-found">404 Not Found</h1>
    </>
  )
}

export default NotFound