import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import api from '../../utils/axiosConfig';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

const CreatePostModal = ({ show, onHide, onPostCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    body: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const postData = {
      ...formData,
      author: user.id,
      authorFirebaseUid: user.firebaseUid
    };

    try {
      const response = await api.post('/posts', postData);
      if (response.data.success) {
        onPostCreated?.(response.data.post);
        setFormData({ title: '', body: '' });
        onHide();
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title>Create Post</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Write a title..."
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="border-0 fs-5"
            />
          </Form.Group>

          <Form.Group>
            <Form.Control
              as="textarea"
              placeholder="What's on your mind?"
              name="body"
              value={formData.body}
              onChange={handleChange}
              required
              className="border-0"
              style={{ minHeight: '150px', resize: 'none' }}
            />
          </Form.Group>

          {error && (
            <div className="text-danger mt-2 small">{error}</div>
          )}
        </Form>
      </Modal.Body>

      <Modal.Footer className="border-0">
        <Button variant="secondary" onClick={onHide} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={isSubmitting || !formData.title.trim() || !formData.body.trim()}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin me-2" />
              Posting...
            </>
          ) : 'Post'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreatePostModal;