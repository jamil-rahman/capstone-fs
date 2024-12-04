import { Nav, Offcanvas, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Home, PenSquare, User, LineChart, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LeftNavbar = ({ show, onHide }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', text: 'Home', icon: <Home size={24} /> },
    { path: '/new-post', text: 'New Post', icon: <PenSquare size={24} /> },
    { path: '/profile', text: 'Profile', icon: <User size={24} /> },
    { path: '/insights', text: 'Insights', icon: <LineChart size={24} /> }
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const NavigationItems = () => (
    <div className="d-flex flex-column justify-content-between h-100">
      <Nav className="flex-column gap-4 text-center">
        {navItems.map((item) => (
          <Nav.Link
            key={item.path}
            as={Link}
            to={item.path}
            className="d-flex flex-column align-items-center gap-2 hover-highlight px-3 py-2 rounded text-white"
          >
            {item.icon}
            <span className="fs-5 text-white">{item.text}</span>
          </Nav.Link>
        ))}
      </Nav>

      {/* Logout Button */}
      <div className="text-center mt-auto pt-4">
        <Button
          variant="danger"
          onClick={handleLogout}
          className="d-flex align-items-center gap-2 mx-auto"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );

  return (
    <Offcanvas
      show={show}
      onHide={onHide}
      placement="start"
      responsive="md"
      className="w-auto border-0"
      style={{
        marginTop: 'var(--navbar-height)',
        height: 'calc(100vh - var(--navbar-height))',
      }}
    >
      <Offcanvas.Header closeButton className="d-md-none">
        <Offcanvas.Title>Navigation</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body
        className="d-flex justify-content-center p-4"
        style={{ height: '100%' }}
      >
        <NavigationItems />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default LeftNavbar;