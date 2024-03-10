import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import UserIcon from "../images/user.png"
import "./Home.css"
import Recommended from './Recommended'
import NewPost from './NewPost'
import Post from './Post'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Image,Transformation } from 'cloudinary-react';


const Home = ({user,logout,userData,notFound,baseUrl,getUserData,setUserData}) => {
  const [recommendedModal,setRecommendedModal] = useState(false)
  const [showAllPosts,setShowAllPosts] = useState(true)
  const [homePosts,setHomePosts] = useState([])
  const [following,setFollowing] = useState([])
  const [followers,setFollowers] = useState([])
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [paginationNumber, setPaginationNumber] = useState(1);
  const navigate = useNavigate()

  console.log(userData && userData.username,followers)

  const getPosts = async (showAllPosts,setHomePosts) =>{
    try {
      if(showAllPosts == true){
          const result = await axios.get(`${baseUrl}/posts/all`)  
          setHomePosts(result.data)
      } else {
          const result = await axios.get(`${baseUrl}/posts/all/following/${user.username}`)
          setHomePosts(result.data)
        }
      } catch (error) {}
  }


  const changeSelect = (event) => {
    setShowAllPosts(JSON.parse(event.target.value))
  }

  const follow = async (userToFollow)=>{
    try {
      const result = await axios.post(`${baseUrl}/users/follow`,{userToFollow},{headers:{"Authorization":`Bearer ${user.token}`}})
    } catch (error) {console.log(error)}
  }

  const getFollow = async() => {
    try {
      const result = await axios.get(`${baseUrl}/users/followInfo/${userData ? userData.username : user.username}`)
      setFollowing(result.data.following)
      setFollowers(result.data.followers)
    } catch (error) {}
  }

  useEffect(()=>{getPosts(showAllPosts,setHomePosts);getFollow();},[showAllPosts,user,userData])

  const handleScroll = () => {
    const windowHeight = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight) {
      setPaginationNumber((prevPaginationNumber) => prevPaginationNumber + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); 


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
          <Image
                cloudName="dchytnqhl"
                onClick={()=>navigate(`/user/${userData ? userData.username : user.username}`)}
                publicId={`linkity/${userData ? userData.username : user.username}`}
                crop="scale"
                defaultImage="0.jpg"
            />
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

            {showFollowersModal && (
              <div className="modal-home">
                <div className="modal-home-content">
                  <span className="modal-home-close" onClick={closeFollowersModal}>&times;</span>
                  <h2>Followers</h2>
                  {followers && followers.map(follower=>{
                      return <div className="modal-home-follower">
                                  <Image
                                    cloudName="dchytnqhl"
                                    onClick={()=>navigate(`/user/${follower.follower.username}`)}
                                    publicId={userData ? `linkity/userData.username` : `linkity/${follower.follower.username}`}
                                    crop="scale"
                                    defaultImage="0.jpg"
                                />
                              <h4  onClick={()=>{navigate(`/user/${follower.follower.username}`);closeFollowersModal()}}>{follower.follower.username}</h4>
                      </div>
                  })}
                </div>
              </div>
            )}

            {showFollowingModal && (
              <div className="modal-home">
                <div className="modal-home-content">
                  <span className="modal-home-close" onClick={closeFollowingModal}>&times;</span>
                  <h2>Following</h2>
                  {following && following.map(followingOne=>{
                      return <div className="modal-home-follower">
                              <Image
                                  cloudName="dchytnqhl"
                                  onClick={()=>navigate(`/user/${followingOne.following.username}`)}
                                  publicId={userData ? `linkity/userData.username` : `linkity/${followingOne.following.username}`}
                                  crop="scale"
                                  defaultImage="0.jpg"
                              />
                              <h4 onClick={()=>{navigate(`/user/${followingOne.following.username}`);closeFollowingModal()}}>{followingOne.following.username}</h4>
                      </div>
                  })}
                </div>
              </div>
            )}
          {(userData && userData.username != user.username )&& 
          <>{!followers.find(item=>item.follower.username === user.username) ? <button className="left-head-follow" onClick={()=>{follow(userData.username);window.location.reload()}}>Follow</button> :
          <button className="left-head-unfollow" onClick={()=>{follow(userData.username);window.location.reload()}}>Unfollow</button> }</>}
        </div>
        <div className="home-mid">
          {(!userData && !notFound) && <NewPost user={user} baseUrl={baseUrl} getPosts={getPosts} showAllPosts={showAllPosts} setHomePosts={setHomePosts}/>}
          {notFound && <p className="not-found">User not found</p>}
          <p className="show-recommended" onClick={()=>setRecommendedModal(true)}>Show recommended users</p>
          {(userData && userData.username == user.username) && <NewPost user={user} baseUrl={baseUrl} getPosts={getPosts} showAllPosts={showAllPosts} 
          setHomePosts={setHomePosts} getUserData={getUserData} setUserData={setUserData}/>}
          <div className="posts-container">
          {(userData && userData.posts && userData.posts.length > 0) ? userData.posts.slice(0,paginationNumber * 10).map(post=>{
            return <Post post={post} user={user} baseUrl={baseUrl}
             getPosts={getPosts} showAllPosts={showAllPosts} setHomePosts={setHomePosts} getUserData={getUserData} setUserData={setUserData}/>
          }) :
            <div className="posts-home-container">
              {(!notFound && !userData) && <div className="posts-home">
                <select className="select-display" onChange={(e)=>changeSelect(e)}>
                  <option value={true} >Show all posts</option>
                  <option value={false} >Show only following posts</option>
                </select>
                <div className="posts-home-show">
                  {(homePosts && homePosts.length > 0) && homePosts.slice(0,paginationNumber * 3).map(homePost=>{
                    return <Post post={homePost} user={user} baseUrl={baseUrl}
                     getPosts={getPosts} showAllPosts={showAllPosts} setHomePosts={setHomePosts}/>
                  })}
                </div>
              </div>}
            </div>}
          </div>
        </div>
        <div className="home-right">
          <Recommended recommendedModal={recommendedModal} setRecommendedModal={setRecommendedModal} user={user} follow={follow} getFollow={getFollow} baseUrl={baseUrl}/>
        </div>
      </div>
    </div>
  )
}

export default Home