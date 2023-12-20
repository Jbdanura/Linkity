import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import UserIcon from "../images/user.png"
import "./Home.css"
import Recommended from './Recommended'
import NewPost from './NewPost'
import Post from './Post'

const Home = ({user,logout,userData}) => {
  const [recommendedModal,setRecommendedModal] = useState(false)

  if(!user) return null

  return (
    <div>
      <Navbar user={user} logout={logout}/>
      <div className="home-container">
        <div className="home-left">
          <div className="left-head">
            <img src={UserIcon}></img>
            {userData ? <p>@{userData.username}</p> :
            <p>@{user.username}</p>}
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
          {!userData && <NewPost user={user}/>}
          {(userData && userData.username == user.username) && <NewPost user={user}/>}
          <p className="show-recommended" onClick={()=>setRecommendedModal(true)}>Show recommended users</p>
          <div className="posts-container">
          {(userData && userData.posts && userData.posts.length > 0) && userData.posts.slice(0).reverse().map(post=>{
            return <Post post={post} userData={userData} user={user}/>
          })}
          </div>
        </div>
        <div className="home-right">
          <Recommended recommendedModal={recommendedModal} setRecommendedModal={setRecommendedModal}/>
        </div>
      </div>
    </div>
  )
}

export default Home