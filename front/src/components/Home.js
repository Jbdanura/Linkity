import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import UserIcon from "../images/user.png"
import "./Home.css"
import Recommended from './Recommended'
import NewPost from './NewPost'
import Post from './Post'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Home = ({user,logout,userData,notFound}) => {
  const [recommendedModal,setRecommendedModal] = useState(false)
  const [showAllPosts,setShowAllPosts] = useState(true)
  const [homePosts,setHomePosts] = useState([])
  const [following,setFollowing] = useState([])
  const [followers,setFollowers] = useState([])
  const [isFollowing,setIsFollowing] = useState(false)
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const navigate = useNavigate()

  const getPosts = async () =>{
    try {
      if(showAllPosts == true){
          const result = await axios.get("http://localhost:777/posts/all")  
          setHomePosts(result.data)
      } else {
          const result = await axios.get(`http://localhost:777/posts/all/following/${user.username}`)
          setHomePosts(result.data)
        }
      } catch (error) {}
  }


  const changeSelect = (event) => {
    setShowAllPosts(JSON.parse(event.target.value))
  }

  const follow = async (userToFollow)=>{
    try {
      const result = await axios.post(`http://localhost:777/users/follow`,{userToFollow},{headers:{"Authorization":`Bearer ${user.token}`}})
      window.location.reload()
    } catch (error) {}
  }

  const followingState = async() => {
    try {
      const result = await axios.post(`http://localhost:777/users/followingState`,{following:userData.username,follower:user.username})
      setIsFollowing(result.data)
    } catch (error) {}
  }

  const getFollow = async() => {
    try {
      const usernameMain = userData ? userData.username : user.username
      const result = await axios.get(`http://localhost:777/users/followInfo/${usernameMain}`)
      setFollowing(result.data.following)
      setFollowers(result.data.followers)
      console.log(following)
    } catch (error) {}
  }

  useEffect(()=>{getPosts();getFollow();followingState()},[showAllPosts,userData,user])

  // New functions to open and close modal
  const openFollowersModal = () => {
    setShowFollowersModal(true);
  };

  const openFollowingModal = () => {
    setShowFollowingModal(true);
  };

  const closeFollowersModal = () => {
    setShowFollowersModal(false);
  };

  const closeFollowingModal = () => {
    setShowFollowingModal(false);
  };


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
            <div className="followers" onClick={openFollowersModal}>
              <p className="label">Followers</p>
              <p className="number">{followers && followers.length}</p>
            </div>
            <div className="following" onClick={openFollowingModal}>
              <p className="label">Following</p>
              <p className="number">{following && following.length}</p>
            </div>
          </div>
            {/* Modal for Followers */}
            {showFollowersModal && (
              <div className="modal-home">
                <div className="modal-home-content">
                  <span className="modal-home-close" onClick={closeFollowersModal}>&times;</span>
                  <h2>Followers</h2>
                  {followers && followers.map(follower=>{
                      return <div className="modal-home-follower">
                              <img src={UserIcon}/>
                              <h4  onClick={()=>{navigate(`/user/${follower.follower.username}`);closeFollowersModal()}}>{follower.follower.username}</h4>
                      </div>
                  })}
                </div>
              </div>
            )}

            {/* Modal for Following */}
            {showFollowingModal && (
              <div className="modal-home">
                <div className="modal-home-content">
                  <span className="modal-home-close" onClick={closeFollowingModal}>&times;</span>
                  <h2>Following</h2>
                  {following && following.map(followingOne=>{
                      return <div className="modal-home-follower">
                              <img src={UserIcon}/>
                              <h4 onClick={()=>{navigate(`/user/${followingOne.following.username}`);closeFollowingModal()}}>{followingOne.following.username}</h4>
                      </div>
                  })}
                </div>
              </div>
            )}
          {(userData && userData.username != user.username )&& 
          <>{!isFollowing ? <button className="left-head-follow" onClick={()=>{follow(userData.username);getFollow()}}>Follow</button> :
          <button className="left-head-unfollow" onClick={()=>{follow(userData.username);getFollow()}}>Unfollow</button> }</>}
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
                <select className="select-display" onChange={(e)=>changeSelect(e)}>
                  <option value={true} >Show all posts</option>
                  <option value={false} >Show only following posts</option>
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
          <Recommended recommendedModal={recommendedModal} setRecommendedModal={setRecommendedModal} user={user} follow={follow} getFollow={getFollow}/>
        </div>
      </div>
    </div>
  )
}

export default Home