import { useState, useRef } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import authService from '../services/authService';
import TextBanner from '../components/TextBanner';

const SignUp = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    // Using refs for form inputs instead of controlled components
    // This reduces unnecessary re-renders and is more efficient
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const formRef = useRef(); // Reference to the entire form

    const validateForm = () => {
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        if (!firstName || !lastName || !email || !password) {
            setError('All fields are required');
            return false;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return false;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) return;

        try {
            setLoading(true);

            const userData = {
                email: emailRef.current.value,
                password: passwordRef.current.value,
                name: `${firstNameRef.current.value} ${lastNameRef.current.value}`
            };

            console.log('Submitting signup data:', {
                ...userData,
                password: '[REDACTED]'
            });

            await authService.signup(userData);

            // Reset form and navigate on success
            formRef.current.reset();
            setSuccess('Account created successfully. Redirecting to login...');
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            console.error('Signup error:', err);
            setError(err.message || 'Failed to create account');
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

                        {/* Sign Up Card */}
                        <Card className="border-0 shadow-sm">
                            <Card.Body className="p-4">
                                <h2 className="text-center mb-4">Create Account</h2>

                                {error && (
                                    <Alert
                                        variant="danger"
                                        onClose={() => setError('')}
                                        dismissible
                                    >
                                        {error}
                                    </Alert>
                                )}

                                {success && (
                                    <Alert
                                        variant="success"
                                        onClose={() => setSuccess('')}
                                        dismissible
                                    >
                                        {success}
                                    </Alert>
                                )}

                                <Form ref={formRef} onSubmit={handleSubmit}>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>First Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    ref={firstNameRef}
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
                                                    ref={lastNameRef}
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
                                            ref={emailRef}
                                            placeholder="name@example.com"
                                            size="lg"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            ref={passwordRef}
                                            placeholder="Create a password"
                                            size="lg"
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            ref={confirmPasswordRef}
                                            placeholder="Confirm your password"
                                            size="lg"
                                        />
                                    </Form.Group>

                                    <Button
                                        variant="primary"
                                        size="lg"
                                        className="w-100 mb-3"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? 'Creating Account...' : 'Create Account'}
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