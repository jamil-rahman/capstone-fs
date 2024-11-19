import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const SignUp = () => {
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

            {/* Sign Up Card */}
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <h2 className="text-center mb-4">Create Account</h2>
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="John"
                          size="lg"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Doe"
                          size="lg"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      size="lg"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Create a password"
                      size="lg"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm your password"
                      size="lg"
                    />
                  </Form.Group>

                  <Button variant="primary" size="lg" className="w-100 mb-3">
                    Create Account
                  </Button>

                  <p className="text-muted text-center small mb-0">
                    By signing up, you agree to our{' '}
                    <a href="#terms" className="text-decoration-none">Terms</a> and{' '}
                    <a href="#privacy" className="text-decoration-none">Privacy Policy</a>
                  </p>
                </Form>
              </Card.Body>
            </Card>

            {/* Login Link */}
            <p className="text-center mt-4">
              Already have an account?{' '}
              <Link to="/login" className="text-decoration-none">Sign in</Link>
            </p>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default SignUp;