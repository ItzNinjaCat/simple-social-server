import { useState, useEffect, useRef } from "react";
import "./App.css";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Notifications from "./components/Notifications";
import Post from "./components/Post";
import ReRenderContext from "./context";
function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({});
    const [isFetching, setIsFetching] = useState(true);
    const [isFetchingPosts, setIsFetchingPosts] = useState(true);
    const ref = useRef(null);
    const handleNotificationClick = (message) => {
        ref.current?.(message);
      };
    const fetchPosts = () => {
        setIsFetchingPosts(true);
        fetch("http://localhost:3000/posts",{
            credentials: 'include',
            })
            .then((res) => {
                if(res.status === 401){
                    setIsLoggedIn(false);
                    setIsFetchingPosts(false);
                    return;
                }
                res.json().then((resData) => {
                    setPosts(resData);
                    setIsLoggedIn(true);
                    setIsFetchingPosts(false);
                });
            }
            )
            .catch((err) => {
                setIsLoggedIn(false);
                alert(err);
            });
    };
    useEffect(() => {
        setIsFetching(true);
        fetch("http://localhost:3000/auth", {
            credentials: "include",
            })
            .then((res) => {
                if(res.status === 401){
                    setIsLoggedIn(false);
                    setIsFetching(false);
                    return;
                }
                res.json().then((resData) => {
                    setUser(resData);
                    setIsLoggedIn(true);
                    setIsFetching(false);
                });
            }
            )
            .catch((err) => {
                console.log("Not logged in"	);
                setIsLoggedIn(false);
                console.log(err);
            }
            );
    }, [isLoggedIn]);

    useEffect(() => {
        if(isLoggedIn){
            fetchPosts();
        }
        else{
            setPosts([]);
            setUser({});
            setIsFetchingPosts(false);
        }
    }, [isLoggedIn]);

    if(isFetching){
        return(
            <Loader/>
        )
    }

    return (
        <ReRenderContext.Provider value={{ isLoggedIn, setIsLoggedIn, fetchPosts, user, handleNotificationClick }}>
            <div className="wrapper">
                    <Header/>
                <div className="main">
                    {isFetchingPosts ? <Loader/> : 
                        <div className="d-flex flex-column align-items-center justify-content-center mt-5">
                            {
                                posts?.length ? posts.map((post) => (
                                    <Post key={post.id} post={post} />
                                ))  : (
                                    <div className="post">
                                        <h2>No posts found</h2>
                                    </div>
                                )
                            }
                        </div>
                    }
                </div>
                <Notifications
                    children={(add) => {
                        ref.current = add;
                    }}
                />
            </div>
        </ReRenderContext.Provider>
    );
}

export default App;
