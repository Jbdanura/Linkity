import React, { useState } from 'react'
import Navbar from './Navbar'
import UserIcon from "../images/user.png"
import "./Home.css"
import NewPost from './NewPost'
import Recommended from './Recommended'

const Home = ({user,logout,userData,notFound}) => {
  const [recommendedModal,setRecommendedModal] = useState(false)

  if(!user) return null

  return (
    <div>
      <Navbar user={user} logout={logout}/>
      <div className="home-container">
        <div className="home-left">
          <div className="left-head">
            <img src={UserIcon}></img>
            <p>@{user.username}</p>
          </div>
          <div className="left-info">
            <div className="posts">
              <p className="label">Posts</p>
              <p className="number">34</p>
            </div>
            <div className="followers">
              <p className="label">Followers</p>
              <p className="number">69</p>
            </div>
            <div className="following">
              <p className="label">Following</p>
              <p className="number">420</p>
            </div>
          </div>
        </div>
        <div className="home-mid">
          {(!userData && !notFound) && <NewPost/>}
          {notFound && <p>User "{notFound}" not found</p>}
          <p className="show-recommended" onClick={()=>setRecommendedModal(true)}>Show recommended users</p>
        </div>
        <div className="home-right">
          <Recommended recommendedModal={recommendedModal} setRecommendedModal={setRecommendedModal}/>
        </div>
      </div>
    </div>
  )
}

export default Home