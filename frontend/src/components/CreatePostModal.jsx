import {useState, useContext} from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ReRenderContext from '../context';
function CreatePostModal(){
    const {fetchPosts, handleNotificationClick} = useContext(ReRenderContext);
    const [show, setShow] = useState(false);
    const [content, setContent] = useState("");
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCreatePost = (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/posts", {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: content,
            }),
        })
        .then((res) => {
            handleClose();
            res.json().then((resData) => {
                console.log(resData);
                handleNotificationClick("Post created successfully");
                fetchPosts();
            });
        }
        )
        .catch((err) => {
            console.log(err);
            handleNotificationClick("Error creating post");
        }
        );
        console.log("Creating post");
    }
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Create Post
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        onSubmit={handleCreatePost}
                    >
                        <Form.Group className="mb-3">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter content"
                                onChange={(e) => setContent(e.target.value)}
                                value={content}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Create Post
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default CreatePostModal;