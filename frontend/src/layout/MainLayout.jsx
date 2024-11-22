// layout/MainLayout.jsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Row, Col, Stack } from 'react-bootstrap';
import TopNavbar from '../components/TopNavbar';
import LeftNavbar from '../components/LeftNavbar';
import RightNavbar from '../components/RightNavbar';

const MainLayout = () => {
  const [showLeftSidebar, setShowLeftSidebar] = useState(false);
  const [showRightSidebar, setShowRightSidebar] = useState(false);

  return (
    <>
      {/* Top Navigation */}
      <TopNavbar 
        onLeftSidebarToggle={() => setShowLeftSidebar(true)}
        onRightSidebarToggle={() => setShowRightSidebar(true)}
      />

      {/* Main Container */}
      <Container fluid>
        <Row>
          {/* Left Sidebar - Hidden on mobile */}
          <Col md={1} className="d-none d-md-block vh-100 overflow-auto position-sticky" style={{ top: '0' }}>
            <LeftNavbar 
              show={showLeftSidebar}
              onHide={() => setShowLeftSidebar(false)}
            />
          </Col>

          {/* Main Content Area */}
          <Col xs={12} md={8} className="min-vh-100 border-start border-end mt-5">
            <Outlet />
          </Col>

          {/* Right Sidebar - Hidden on mobile */}
          <Col md={3} className="d-none d-md-block vh-100 overflow-auto position-sticky" style={{ top: '0' }}>
            <RightNavbar 
              show={showRightSidebar}
              onHide={() => setShowRightSidebar(false)}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MainLayout;