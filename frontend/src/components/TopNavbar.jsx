// components/TopNavbar.jsx
import { Navbar, Container, Nav, Button, NavDropdown } from 'react-bootstrap';
import { List, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TopNavbar = ({ onLeftSidebarToggle, onRightSidebarToggle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

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
              <>
                {/* Navigation Links */}
                <Nav.Link as={Link} to="/new-post">New Post</Nav.Link>

                {/* Profile Dropdown */}
                <NavDropdown
                  title={
                    <div className="d-inline-block">
                      {user.profileImage ? (
                        <img
                          src={user.profileImage}
                          alt="Profile"
                          className="rounded-circle object-fit-cover"
                          style={{ width: '32px', height: '32px' }}
                        />
                      ) : (
                        <div className="bg-light rounded-circle p-1 d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                          <User size={20} />
                        </div>
                      )}
                    </div>
                  }
                  id="profile-dropdown"
                  align="end"
                >
                  <NavDropdown.Item as={Link} to="/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
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