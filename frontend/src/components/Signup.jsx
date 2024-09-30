import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";
import '../index.css';
import Header from "./Header";

const Signup = () => {
  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Here, you would normally handle signup logic, such as calling an API
    console.log('Signup form submitted', { email, password });
  };

  return (
    <>
    {/* <Header /> */}
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <Form className='border p-4 rounded bg-light' onSubmit={handleSubmit}>
        <h2>Signup</h2>

        {/* Email Input */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </Form.Group>

        {/* Password Input */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </Form.Group>

        {/* Confirm Password Input */}
        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Confirm Password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
        </Form.Group>

        {/* Submit Button */}
        <Button variant="primary" type="submit">
          Signup
        </Button>
      </Form>
    </div>
    </>
  );
};

export default Signup;
