import React,{useState,useEffect} from 'react';
import './App.css';
import Post from "./Post.js"
import { db } from "./firebase.js"

function App() {
  const [posts,setPosts] = useState([]);

  useEffect(() => {
      db.collection('posts')
      .onSnapshot(snapshot =>{
        setPosts(snapshot.docs.map(doc =>({
          id:doc.id,
          post: doc.data()
        })))
      })
    // return () => {
    //   cleanup
    // }
  }, [])
  return (
    <div className="app">
    <div className="app_header">
      <img src="https://i.ibb.co/Bnpqtwx/5a4e432a2da5ad73df7efe7a.png" alt="" className="app_header_image"/>
    </div>

    {
      posts.map(({id,post}) => (
        <Post key={id} userName={post.username} imageUrl={post.imageUrl} caption={post.caption} imageUrl={post.imageUrl} />
      ))
    }

    </div>
  );
}

export default App;
