import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { List } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TopNavbar = ({ onLeftSidebarToggle, onRightSidebarToggle }) => {
  const { user } = useAuth();

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className="shadow-sm"
      style={{
        height: 'var(--navbar-height)',
        backgroundColor: '#7F95D1',
      }}
    >
      <Container fluid>
        {/* Left Menu Toggle */}
        <Button
          variant="link"
          className="d-md-none p-0 text-white border-0"
          onClick={onLeftSidebarToggle}
        >
          <List size={20} />
        </Button>

        <Navbar.Brand className='text-white px-md-2 d-flex align-items-center gap-2' as={Link} to="/">
          <span className="fs-4">When in Roam</span>
        </Navbar.Brand>

        {/* Right Menu Toggle */}
        <Button
          variant="link"
          className="d-md-none me-2 p-0 text-white border-0"
          onClick={onRightSidebarToggle}
        >
          <List size={20} />
        </Button>

        {/* Nav items only visible on desktop */}
        <Nav className="ms-auto align-items-center d-none d-md-flex">
          {user ? (
            <Nav.Link className='text-white' as={Link} to="/new-post">
              Hi, {user.name.split(" ")[0]}
            </Nav.Link>
          ) : (
            <>
              <Nav.Link className='text-white' as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/signup"
                className="btn btn-primary text-white ms-2"
              >
                Sign Up
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;