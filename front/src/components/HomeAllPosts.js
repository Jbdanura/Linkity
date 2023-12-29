import React from 'react'
import axios from "axios"
import { useEffect,useState } from 'react'
import Post from './Post'

const HomeAllPosts = () => {
  const [posts,setPosts] = useState(null)

  const retrievePosts = async () => {
    try {
        const result = await axios.get("https://linkity.onrender.com/posts/all")
        setPosts(result.data)
    } catch (error) {
        alert(error)
    }
  }
  console.log(posts)
  useEffect(()=>{
    retrievePosts()
  },[])

  return (
    <div className="posts-container">
      {posts && posts.map(post=>{
        return <Post post={post}></Post>
      })}
    </div>
  )
}

export default HomeAllPosts