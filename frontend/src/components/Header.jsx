import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import { useEffect, useRef } from "react";
import { useContext } from "react";
import ReRenderContext from "../context";
import CreatePostModal from "./CreatePostModal";
function Header() {
    const { isLoggedIn, setIsLoggedIn, user } = useContext(ReRenderContext);
    const navRef = useRef(null);
    useEffect(() => {
        var prevScrollpos = window.pageYOffset;
        window.onscroll = function () {
            var currentScrollPos = window.pageYOffset;
            if (prevScrollpos > currentScrollPos) {
                navRef.current.style.top = "0";
            } else {
                navRef.current.style.top = "-100px";
            }
            prevScrollpos = currentScrollPos;
        };
    }, []);

    const logOut = () => {
        fetch("http://localhost:3000/logout", {
            method: "POST",
            credentials: "include",
        })
            .then((res) => {
                setIsLoggedIn(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <Navbar
            bg="light"
            expand="xl"
            className="header"
            sticky="top"
            ref={navRef}
        >
            <Container fluid>
                <Navbar.Brand href="/">
                    Simple social server
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navBar" />
                <Navbar.Offcanvas
                    id="navBar"
                    aria-labelledby="navBar"
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="navBar">
                            Simple social server
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body  className="align-items-center justify-content-end">
                        <div className="flex-grow-1 ms-3">
                            {isLoggedIn ? <CreatePostModal/> : null}
                        </div>
                        {isLoggedIn ? (
                            <div className="header-register d-flex justify-content-between me-3 align-items-center">
                                <div className="flex-grow-1 text-nowrap overflow-hidden text-truncate me-3">
                                    <span className="ms-n3 fw-bold">
                                        {user.name}
                                    </span>
                                </div>
                                <Button onClick={logOut}>Logout</Button>
                            </div>
                        ) : (
                            <div className="header-register d-flex justify-content-between me-3">
                                <LoginModal/>
                                <RegisterModal />
                            </div>
                        )}
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default Header;
