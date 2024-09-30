import React from 'react';
import { Button, Form } from "react-bootstrap";
import '../App.css';
import Header from "./Header";

const Login = () => {
  return (
    <>
    {/* <Header /> */}
    <div className='color-overlay d-flex justify-content-center align-items-center'>
        <Form className='rounded p-4'>
            <h1>Login</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    </div>
    </>
  )
}

export default Login;