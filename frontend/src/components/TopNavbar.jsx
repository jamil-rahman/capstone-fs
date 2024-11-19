// components/TopNavbar.jsx
import { Navbar, Container, Nav, Button, NavDropdown, Image } from 'react-bootstrap';
import { List, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const TopNavbar = ({ onLeftSidebarToggle, onRightSidebarToggle }) => {
  // This will be replaced with actual auth logic later
  const isLoggedIn = true; // Toggle this to test different states

  return (
    <Navbar bg="white" expand="lg" className="mb-3 shadow-sm" fixed="top">
      <Container fluid>
        {/* Left Menu Toggle */}
        <Button 
          variant="light"
          className="d-md-none"
          onClick={onLeftSidebarToggle}
        >
          <List size={20} />
        </Button>

        <Navbar.Brand as={Link} to="/">Your App</Navbar.Brand>
        
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
            {isLoggedIn ? (
              <>
                {/* Navigation Links */}
                <Nav.Link as={Link} to="/new-post">New Post</Nav.Link>
      
                {/* Profile Dropdown */}
                <NavDropdown 
                  title={
                    <div className="d-inline-block">
                      {/* If you have a user avatar, use this */}
                      {/* <Image
                        src="/path-to-avatar.jpg"
                        roundedCircle
                        width={32}
                        height={32}
                        className="object-fit-cover"
                      /> */}
                      
                      {/* Placeholder icon if no avatar */}
                      <div className="bg-light rounded-circle p-1 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                        <User size={20} />
                      </div>
                    </div>
                  } 
                  id="profile-dropdown"
                  align="end"
                >
                  <NavDropdown.Item as={Link} to="/logout">
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              // Show these items when user is not logged in
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