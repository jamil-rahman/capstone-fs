import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous errors
    setTitleError('');
    setDescriptionError('');

    // Validate title and description length
    if (title.length > 100) {
      setTitleError('Title cannot exceed 100 characters');
      return;
    }
    if (description.length > 2000) {
      setDescriptionError('Description cannot exceed 2000 characters');
      return;
    }

    // Here, you would normally handle post submission logic, such as calling an API
    console.log('Post submitted', { title, description });
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <Form className='border p-4 rounded bg-light' onSubmit={handleSubmit}>
        <h2>Create Post</h2>

        {/* Title Input */}
        <Form.Group className="mb-3" controlId="formPostTitle">
          <Form.Label>Title (Max 100 characters)</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter post title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            maxLength={100} 
          />
          {titleError && <small className="text-danger">{titleError}</small>}
        </Form.Group>

        {/* Description Input */}
        <Form.Group className="mb-3" controlId="formPostDescription">
          <Form.Label>Description (Max 2000 characters)</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={3} 
            placeholder="Enter post description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            maxLength={2000} 
          />
          {descriptionError && <small className="text-danger">{descriptionError}</small>}
        </Form.Group>

        {/* Submit Button */}
        <Button variant="primary" type="submit">
          Create Post
        </Button>
      </Form>
    </div>
  );
};

export default CreatePost;
