import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import UserIcon from "../images/user.png"
import "./Home.css"
import Recommended from './Recommended'
import NewPost from './NewPost'
import Post from './Post'
import axios from 'axios'

const Home = ({user,logout,userData,notFound}) => {
  const [recommendedModal,setRecommendedModal] = useState(false)
  const [showAllPosts,setShowAllPosts] = useState(true)
  const [homePosts,setHomePosts] = useState(null)

  const getPosts = async () =>{
    try {
      if(showAllPosts){
          const result = await axios.get("http://localhost:777/posts/all")  
          setHomePosts(result.data)
      } else{
          const result = await axios.get(`http://localhost:777/posts/all/following/${user.username}`)
          setHomePosts(result.data)
        }
      } catch (error) {}
  }

  useEffect(()=>{getPosts()},[showAllPosts])

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
          {(!userData && !notFound) && <NewPost user={user}/>}
          {notFound && <p className="not-found">User not found</p>}
          <p className="show-recommended" onClick={()=>setRecommendedModal(true)}>Show recommended users</p>
          {(userData && userData.username == user.username) && <NewPost user={user}/>}
          <div className="posts-container">
          {(userData && userData.posts && userData.posts.length > 0) ? userData.posts.map(post=>{
            return <Post post={post} user={user}/>
          }) :
            <div className="posts-home-container">
              {(!notFound && !userData) && <div className="posts-home">
                <select className="select-display" onChange={(e) => {setShowAllPosts(e.target.value);console.log(showAllPosts)}}>
                  <option value={true}>Show all posts</option>
                  <option value={false}>Show only following posts</option>
                </select>
                <div className="posts-home-show">
                  {(homePosts && homePosts.length > 0) && homePosts.map(homePost=>{
                    return <Post post={homePost} user={user}/>
                  })}
                </div>
              </div>}
            </div>}
          </div>
        </div>
        <div className="home-right">
          <Recommended recommendedModal={recommendedModal} setRecommendedModal={setRecommendedModal} user={user}/>
        </div>
      </div>
    </div>
  )
}

export default Home