import { useState, useRef } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import authService from '../services/authService';
import TextBanner from '../components/TextBanner';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth(); // Get setUser from auth context

  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Get the redirect path if it exists
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);

      const credentials = {
        email: emailRef.current.value,
        password: passwordRef.current.value
      };

      console.log('Attempting login with:', {
        ...credentials,
        password: '[REDACTED]'
      });

      const response = await authService.login(credentials);

      // Store user data in context
      setUser(response.user);

      // Storing the user data in localStorage just in case
      localStorage.setItem('user', JSON.stringify(response.user));

      console.log('Login successful, navigating to:', from);
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login error details:', err);
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <Container className="flex-grow-1 d-flex flex-column justify-content-center py-5">
        <Row className="justify-content-center">
          <Col xs={11} sm={10} md={8} lg={6} xl={5}>
            {/* App Branding */}
            <TextBanner />

            {/* Login Card */}
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <h2 className="text-center mb-4">Welcome Back</h2>

                {error && (
                  <Alert variant="danger" onClose={() => setError('')} dismissible>
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      ref={emailRef}
                      placeholder="name@example.com"
                      size="lg"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      ref={passwordRef}
                      placeholder="Enter your password"
                      size="lg"
                      required
                    />
                  </Form.Group>

                  <Button
                    variant="primary"
                    size="lg"
                    className="w-100 mb-3"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>

                  <div className="text-center mb-3">
                    <Link to="/forgot-password" className="text-decoration-none">
                      Forgot password?
                    </Link>
                  </div>
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
    </div>
  );
};
export default Login;