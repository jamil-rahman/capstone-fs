import React from 'react';
// import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const AuthHeader = () => {
  return (
    <>  
<Navbar expand="lg" className="bg-body-tertiary justify-content-between">
<Container>
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="me-auto">
    <Nav.Link as={Link} to="/auth/signup">Signup</Nav.Link>
    <Nav.Link as={Link} to="/auth/login">Login</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Container>
</Navbar>
</>
  );
};

export default AuthHeader;
