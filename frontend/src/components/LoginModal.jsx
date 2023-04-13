
import {useState, useContext} from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ReRenderContext from '../context';
function LoginModal(){
    const {setIsLoggedIn} = useContext(ReRenderContext);
    const [show, setShow] = useState(false);
    const [username, setUsername] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleLogin = (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/login", {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: username,
            }),
        })
            .then((res) => {
                handleClose();
                setIsLoggedIn(true);
            })
            .catch((err) => {
                console.log(err);
            });
        console.log("Logging in");
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Login
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        onSubmit={handleLogin}
                    >
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default LoginModal;