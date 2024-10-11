import React from 'react';
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Header from "./Header";

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Assume successful login logic here
    console.log('Logged in with', { email, password });
    navigate('/');  // Redirect to the main page after login
    };

  return (
    <>
    {/* <Header /> */}
    <Form onSubmit={handleSubmit}>
    <div className='login-color-overlay d-flex justify-content-center align-items-center'>
      <Container>
        <Row className="login-justify-content-center">
          <Col xs={12} md={6} lg={4}>
            <Form className='rounded p-4'>
              <h1 className='text-center text-white mb-4'>Login</h1>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
    </Form>
    </>
  );
};

export default Login;