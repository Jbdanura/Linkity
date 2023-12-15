import React from 'react'
import Navbar from './Navbar'
import UserIcon from "../images/user.png"
import "./Home.css"
import NewPost from './NewPost'
import Recommended from './Recommended'

const Home = ({user,logout}) => {

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
          <NewPost/>
          <p className="show-recommended">Show recommended users</p>
        </div>
        <div className="home-right">
          <Recommended/>
        </div>
      </div>
    </div>
  )
}

export default Home