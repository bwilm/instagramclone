import React,{useState, useEffect} from 'react'
import "./Post.css"
import Avatar from "@material-ui/core/Avatar"
import { db } from './firebase';
import firebase from 'firebase'

function Post({postId,caption, userName, imageUrl,user}) {
    const [comments, setComments ] =useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        let unsubscribe;
        if(postId){
            unsubscribe = db
            .collection("posts")
            .doc(postId)
            .collection("comments")
            .orderBy("timeStamp","asc")
            .onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()));
            })
        }
        return () => {
            unsubscribe();
        }
    }, [postId])


    const postComment =(event)=>{
    event.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
        text:comment,
        username:user.displayName,
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment('');
    }
    return (
        <div className="post_container">
            <div className="post_header">

            <Avatar
            className="post_avatar"
            alt='Bran'
            src=""
            />
            <h3>{userName}</h3>

            </div>

            {/*Header -> avatar -> + username */}
            <img src={imageUrl} className="post_image" alt=""/>
            {/*image*/}
            {/*username + caption */}
            <h4 className="post_text"><strong>{userName}:</strong>{caption}</h4>
            <div className="post_comments">
                {comments.map((comment) =>(
                    <p>
                        <strong>{comment.username} </strong> {comment.text}
                    </p>
                ))}
            </div>

            { user && (


            <div className="post_commentBox">
            <form className="post_form">
                <input className="post_input" type="text" placeholder="Add a comment..." value={comment} onChange={(e)=> setComment(e.target.value)}/>
                <button className="post_button" disabled={!comment} type="submit" onClick={postComment}>POST</button>
            </form>
            </div>

            )

            }


        </div>
    )
}

export default Post
