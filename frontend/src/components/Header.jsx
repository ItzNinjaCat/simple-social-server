import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect, useRef } from "react";

function Header({ isLoggedIn }) {
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
                    Decentralized ticketing system
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navBar" />
                <Navbar.Offcanvas
                    id="navBar"
                    aria-labelledby="navBar"
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="navBar">
                            Decentralized ticketing system
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {isLoggedIn ? (
                            <Button>Logout</Button>
                        ) : (
                            <div>
                                <Button>Login</Button>
                                <Button>Register</Button>
                            </div>
                        )}
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default Header;
