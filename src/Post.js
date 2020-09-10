import React from 'react'
import "./Post.css"
import Avatar from "@material-ui/core/Avatar"

function Post({caption, userName, imageUrl}) {
    return (
        <div className="post_container">
            <div className="post_header">

            <Avatar
            className="post_avatar"
            alt={userName}
            src=""
            />
            <h3>{userName}</h3>

            </div>

            {/*Header -> avatar -> + username */}
            <img src={imageUrl} className="post_image" alt="" srcset=""/>
            {/*image*/}
            {/*username + caption */}
            <h4 className="post_text"><strong>{userName}:</strong>{caption}</h4>
        </div>
    )
}

export default Post
