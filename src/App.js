import React, {useState, useEffect} from 'react';
import './App.css';
import Post from "./Post.js"
import {db, auth} from "./firebase.js"
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button'
import {makeStyles} from '@material-ui/core/styles';
import {Input} from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {top: `${top}%`, left: `${left}%`, transform: ` translate(-${top}%, -${left}%)`};
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3)
    }
}));

function App() {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [posts,
        setPosts] = useState([]);
    const [open,
        setOpen] = useState(false);
    const [email,
        setEmail] = useState('');
    const [password,
        setPassword] = useState('');
    const [username,
        setUsername] = useState('');
    const [user,
        setUser] = useState(null);
    const [openSignIn,
        setOpenSignIn] = useState(false);

    useEffect(() => {
        db
            .collection('posts')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setPosts(snapshot.docs.map(doc => ({
                    id: doc.id,
                    post: doc.data()
                })))
            })
        // return () => {   cleanup }
    }, [])

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                console.log(authUser);
                setUser(authUser);

            } else {
                setUser(null);
            }
        })
        return () => {
            unsubscribe();
        }
    }, [user, username])

    const signUp = (event) => {
        event.preventDefault();
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                return authUser
                    .user
                    .updateProfile({displayName: username})
            })
            .catch((error) => alert(error.message))
            setOpen(false);
    }
    const signIn = (event) => {
        event.preventDefault();
        auth
            .signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error.message));
            setOpenSignIn(false);

    }
    return (
        <div className="app">

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby=""
                aria-describedby="">
                <div style={modalStyle} className={classes.paper}>
                    <form className="app_signup">
                        <center>
                            <img
                                className="app_header_image"
                                src="https://i.ibb.co/Bnpqtwx/5a4e432a2da5ad73df7efe7a.png"
                                alt=""/>
                            <Input
                                placeholder="username"
                                text="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}/>
                            <Input
                                placeholder="email"
                                text="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}/>
                            <Input
                                placeholder="password"
                                text="text"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}/>
                            <Button type="submit" onClick={signUp}>Sign Up</Button>
                        </center>
                    </form>
                </div>
            </Modal>
            <Modal
                open={openSignIn}
                onClose={() => setOpenSignIn(false)}
                aria-labelledby=""
                aria-describedby="">
                <div style={modalStyle} className={classes.paper}>
                    <form className="app_signup">
                        <center>
                            <img
                                className="app_header_image"
                                src="https://i.ibb.co/Bnpqtwx/5a4e432a2da5ad73df7efe7a.png"
                                alt=""/>
                            <Input
                                placeholder="username"
                                text="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}/>
                            <Input
                                placeholder="email"
                                text="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}/>
                            <Input
                                placeholder="password"
                                text="text"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}/>
                            <Button type="submit" onClick={signIn}>Login</Button>
                        </center>
                    </form>
                </div>
            </Modal>

            <div className="app_header">
                <img
                    src="https://i.ibb.co/Bnpqtwx/5a4e432a2da5ad73df7efe7a.png"
                    alt=""
                    className="app_header_image"/> {user
                    ? (
                        <Button onClick={() => auth.signOut()}>Logout</Button>
                    )
                    : <div className="app_loginContainer">
                        <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
                        <Button onClick={() => setOpen(true)}>Sign Up</Button>

                    </div>
}
            </div>

            <div className="app_posts">

                <div className="app_posts_left">
                    {posts.map(({id, post}) => (<Post
                        key={id}
                        postId={id}
                        user={user}
                        userName={post.username}
                        imageUrl={post.imageUrl}
                        caption={post.caption}
                        imageUrl={post.imageUrl}/>))}
                </div>
                <div className="app_posts_right">
                    <InstagramEmbed
                        url="https://www.instagram.com/p/B5BwkAphj0G/?utm_source=ig_web_button_share_sheet"
                        maxWidth={320}
                        hideCaption={false}
                        containerTagName='div'
                        protocol=''
                        injectScript
                        onLoading={() => {}}
                        onSuccess={() => {}}
                        onAfterRender={() => {}}
                        onFailure={() => {}}/>
                </div>

            </div>

            {user
                ?.displayName
                    ? (<ImageUpload username={user.displayName}/>)
                    : (
                        <h3>Please Sign In to Upload</h3>
                    )
}

        </div>
    );
}

export default App;
