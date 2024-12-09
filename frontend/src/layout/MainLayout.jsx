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
      <Container fluid className="px-0">
        <Row className="mx-0 backdrop">
          <Col md={1} className="d-none d-md-block sticky-top p-0 left_nav">
            <LeftNavbar show={showLeftSidebar} onHide={() => setShowLeftSidebar(false)} />
          </Col>

          {/* Main Content Area */}
          <Col xs={12} md={9} className="border-start border-end px-1" style={{ marginTop: 'var(--navbar-height)' }}>
            <Outlet />
          </Col>
          {/* Right Sidebar - Hidden on mobile */}
          <Col md={2} className="d-none d-md-block vh-100 overflow-auto position-sticky" style={{ top: '0' }}>
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