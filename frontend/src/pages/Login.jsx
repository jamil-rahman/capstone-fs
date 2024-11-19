import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';


const Login = () => {
    console.log('Login component rendering');
  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <Container className="flex-grow-1 d-flex flex-column justify-content-center py-5">
        <Row className="justify-content-center">
          <Col xs={11} sm={10} md={8} lg={6} xl={5}>
            {/* App Branding */}
            <div className="text-center mb-5">
              <h1 className="display-4 mb-2">Your App Name</h1>
              <p className="lead text-muted">Your app's catchy tagline goes here</p>
            </div>
            
            {/* Login Card */}
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <h2 className="text-center mb-4">Welcome Back</h2>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      size="lg"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your password"
                      size="lg"
                    />
                  </Form.Group>

                  <Button variant="primary" size="lg" className="w-100 mb-3">
                    Sign In
                  </Button>

                </Form>
              </Card.Body>
            </Card>

            {/* Sign Up Link */}
            <p className="text-center mt-4">
              Don't have an account?{' '}
              <Link to="/signup" className="text-decoration-none">Sign up</Link>
            </p>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};
export default Login;