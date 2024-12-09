import { Nav, Offcanvas, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import CreatePostModal from './posts/CreatePostModal';

const LeftNavbar = ({ show, onHide }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showCreatePost, setShowCreatePost] = useState(false);

  const navItems = [
    { path: '/', text: 'Home', icon: '/home.png' },
    { path: '#', text: 'New Post', icon: '/post.png', onClick: () => setShowCreatePost(true) },
    { path: '/profile', text: 'Profile', icon: '/profile.png' },
    { path: '/insights', text: 'Insights', icon: '/insights.png' },
    { path: '/my-post', text: 'Post History', icon: '/history.png' }
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
            onClick={item.onClick}
            className="d-flex flex-column align-items-center gap-2 hover-highlight px-3 py-2 rounded"
          >
            <div className="nav-icon-container">
              <img
                src={item.icon}
                alt={item.text}
                className="nav-icon img-fluid"
                style={{
                  width: '32px',
                  height: '32px',
                  objectFit: 'contain',
                  transition: 'transform 0.2s'
                }}
              />
            </div>
            <span className="fs-5">{item.text}</span>
          </Nav.Link>
        ))}
      </Nav>

      {/* Logout Button */}
      <div className="text-center mt-auto pt-4">
        <Button
          variant="light"
          onClick={handleLogout}
          className="d-flex align-items-center gap-2 mx-auto btn btn-outline-danger"
        >
          <img
            src="/logout.png"
            alt="Logout"
            style={{
              width: '24px',
              height: '24px',
              objectFit: 'contain'
            }}
          />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Offcanvas
        show={show}
        onHide={onHide}
        placement="start"
        responsive="md"
        className="w-auto border-0"
        style={{
          marginTop: 'var(--navbar-height)',
          height: 'calc(100vh - var(--navbar-height))',
          backgroundColor: '#F3FCF0',
          color: '00000'
        }}
      >
        <Offcanvas.Header closeButton className="d-md-none">
          <Offcanvas.Title className='text-dark'>Navigation</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body
          className="d-flex justify-content-center p-4"
          style={{ height: '100%' }}
        >
          <NavigationItems />
        </Offcanvas.Body>
      </Offcanvas>

      <CreatePostModal
        show={showCreatePost}
        onHide={() => setShowCreatePost(false)}
        onPostCreated={(newPost) => {
          console.log('New post created:', newPost);
          setShowCreatePost(false);
          window.location.reload();
        }}
      />
    </>
  );
};


export default LeftNavbar;