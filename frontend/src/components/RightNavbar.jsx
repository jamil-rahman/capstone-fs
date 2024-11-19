// components/RightNavbar.jsx
import { Offcanvas } from 'react-bootstrap';
import Trivia from './Trivia';

const RightNavbar = ({ show, onHide }) => {
  return (
    <Offcanvas 
      show={show} 
      onHide={onHide} 
      placement="end" 
      responsive="md"
      className="w-auto"
      style={{ 
        marginTop: '56px', // Height of Bootstrap navbar
        height: 'calc(100vh - 56px)' // Subtract navbar height from viewport height
      }}
    >
      <Offcanvas.Header closeButton className="d-md-none">
        <Offcanvas.Title>More Info</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body 
        className="bg-white shadow-sm p-3"
        style={{ 
          overflowY: 'auto',  // Enable scrolling
          height: '100%'      // Take full height of parent
        }}
      >
        <Trivia />
        {/* Add other right sidebar content here */}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default RightNavbar;