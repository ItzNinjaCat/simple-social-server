import { useState, useEffect, useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaHeart, FaRegHeart  } from 'react-icons/fa';
import { useSpring, animated } from 'react-spring';
import ReRenderContext from '../context';
function Post({ post }) {
    const [liked, setLiked] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const { fetchPosts, user, handleNotificationClick } = useContext(ReRenderContext);

    const changeLikeStatus = () => {
        if(!liked){
            fetch(`http://localhost:3000/posts/${post.id}/like`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                post.likes.push(user.id);
                handleNotificationClick("Successfully liked post");
            }
            )
            .catch((err) => {
                console.log(err);
                alert("Error liking post");
            }
            );
            setLiked(!liked);
            setIsExpanded(!isExpanded);
        }
        else{
            fetch(`http://localhost:3000/posts/${post.id}/unlike`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                post.likes = post.likes.filter((id) => id !== user.id);
                handleNotificationClick("Successfully unliked post");
            }
            )
            .catch((err) => {
                console.log(err);
                alert("Error unliking post");
            }
            );
            setLiked(!liked);
            setIsExpanded(!isExpanded);
        }
    };

    const handleDoubleTap = (e) => {
        if(e.detail  === 2){
            changeLikeStatus();
        }
    };
  
    useEffect(() => {
        if (isExpanded) {
          const timeoutId = setTimeout(() => {
            setIsExpanded(false);
          }, 250); // Change the delay as needed (in milliseconds)
          return () => clearTimeout(timeoutId);
        }
      }, [isExpanded]);

    useEffect(() => {
        if (post.likes?.includes(user.id)) {
            setLiked(true);
        }
    }, [post.likes, user]);

    const deletePost = () => {
        fetch(`http://localhost:3000/posts/${post.id}`, {
            method: "DELETE",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res) => {
            fetchPosts();
            setShowDelete(false);
            handleNotificationClick("Successfully deleted post");
        }
        )
        .catch((err) => {
            console.log(err);
            handleNotificationClick("Error deleting post");
        }
        );
    }

    const heartAnimation = useSpring({
        from: { transform: 'scale(1)' },
        to: { transform: isExpanded ? 'scale(1.3)' : 'scale(1)' },
    });
  
    const buttonLike = () => {
        changeLikeStatus();
    }

    return (
      <div onClick={handleDoubleTap} className="post-card user-select-none">
        <div className='d-flex justify-content-between m-auto'>
            <span>
                <h3>{post.content}</h3>
                <p className='text-break desc-text mt-2'>Likes: {post.likes?.length ?? 0}</p>
            </span>
            <div className='d-flex flex-column align-items-end justify-content-between'>
                <animated.div style={heartAnimation} className="like" onClick={buttonLike}>
                    {liked ? <FaHeart className='text-danger'/> : <FaRegHeart />}
                </animated.div>
                {
                    user.name === post.userName ? 
                    <>
                        <Button variant='danger' className='my-1' onClick={() => setShowDelete(true)}>Delete</Button>
                        <Modal
                            show={showDelete}
                            onHide={() => setShowDelete(false)}
                            backdrop="static"
                            keyboard={false}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Delete Post</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                Are you sure you want to delete this post?
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={() => setShowDelete(false)}>
                                    Close
                                </Button>
                                <Button variant="danger" onClick={deletePost}>
                                    Delete
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                    : null
                }
            </div>
        </div>
      </div>
    );
  }

export default Post;