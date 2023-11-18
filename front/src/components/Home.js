import React from 'react'
import CreatePost from './CreatePost'
import HomeAllPosts from './HomeAllPosts'

const Home = ({user}) => {

  return (
    <div>
        Welcome {user.username}
        <CreatePost user={user}/>
        <HomeAllPosts/>
    </div>

  )
}

export default Home