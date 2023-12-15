import React from 'react'
import "./NewPost.css"
import UserIcon from "../images/user.png"

const NewPost = () => {
  return (
    <div className="new-post">
        <img src={UserIcon}/>
        <div className="new-post-info">
            <input placeholder="Your post here..."></input>
        </div>
    </div>
  )
}

export default NewPost