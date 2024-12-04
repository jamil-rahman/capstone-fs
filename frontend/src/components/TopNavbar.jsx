// components/TopNavbar.jsx
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { List } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TopNavbar = ({ onLeftSidebarToggle, onRightSidebarToggle }) => {
  const { user } = useAuth();

  return (
    <Navbar
      bg="white"
      expand="lg"
      fixed="top"
      className="shadow-sm"
      style={{ height: 'var(--navbar-height)' }}
    >
      <Container fluid>
        {/* Left Menu Toggle */}
        <Button
          variant="light"
          className="d-md-none"
          onClick={onLeftSidebarToggle}
        >
          <List size={20} />
        </Button>

        <Navbar.Brand as={Link} to="/">When In Roam</Navbar.Brand>

        {/* Right Menu Toggle */}
        <Button
          variant="light"
          className="d-md-none me-2"
          onClick={onRightSidebarToggle}
        >
          <List size={20} />
        </Button>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {user ? (
              <Nav.Link as={Link} to="/new-post">New Post</Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup" className="btn btn-primary text-white ms-2">
                  Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;