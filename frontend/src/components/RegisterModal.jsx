import { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ReRenderContext from '../context';

function RegisterModal(){
    const {setIsLoggedIn} = useContext(ReRenderContext);
    const [show, setShow] = useState(false);
    const [username, setUsername] = useState("");
    const handleClose = () => {
        setShow(false);
        setUsername("");
    }
    const handleShow = () => setShow(true);
    const handleRegister = (e) => {
        e.preventDefault();
        
        fetch("http://localhost:3000/register", {
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
                        setIsLoggedIn(true);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
            console.log("Registering");
    }
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Register
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        onSubmit={handleRegister}
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
                        <Button variant="primary" type="submit" disabled={username.length < 5}>
                            Register
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default RegisterModal;