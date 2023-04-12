import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
function App() {
    const [count, setCount] = useState(0);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/posts")
            .then((res) => res.json())
            .then((data) => setPosts(data));
    }, []);

    return (
        <div className="wrapper">
            <Header isLoggedIn={false} />
            <div className="main">
                {posts.map((post) => (
                    <div className="post" key={post.id}>
                        <h2>{post.content}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
