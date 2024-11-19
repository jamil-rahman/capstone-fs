// components/LeftNavbar.jsx
import { Nav, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Home, PenSquare, User, LineChart } from 'lucide-react';

const LeftNavbar = ({ show, onHide }) => {
  const navItems = [
    { path: '/', text: 'Home', icon: <Home size={24} /> },
    { path: '/new-post', text: 'New Post', icon: <PenSquare size={24} /> },
    { path: '/profile', text: 'Profile', icon: <User size={24} /> },
    { path: '/insights', text: 'Insights', icon: <LineChart size={24} /> }
  ];

  const NavigationItems = () => (
    <Nav className="flex-column gap-4 text-center mt-4">
      {navItems.map((item) => (
        <Nav.Link 
          key={item.path}
          as={Link} 
          to={item.path} 
          className="d-flex flex-column align-items-center gap-2 hover-highlight px-3 py-2 rounded"
        >
          {item.icon}
          <span className="fs-5">{item.text}</span>
        </Nav.Link>
      ))}
    </Nav>
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
        className="p-4"
        style={{ 
          overflowY: { xs: 'auto', md: 'visible' },
          height: '100%',
          position: 'relative'
        }}
      >
        <NavigationItems />
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default LeftNavbar;