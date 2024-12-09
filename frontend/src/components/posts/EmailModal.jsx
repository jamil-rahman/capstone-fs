import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { sendEmail } from '../../services/emailService';

const EmailModal = ({ show, onHide, recipient }) => {
  const [formData, setFormData] = useState({
    subject: '',
    message: ''
  });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await sendEmail({
        recipientId: recipient._id,
        ...formData
      });
      onHide();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to send email');
    } finally {
      setSending(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Email {recipient?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData(prev => ({...prev, subject: e.target.value}))}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData(prev => ({...prev, message: e.target.value}))}
              required
            />
          </Form.Group>
          {error && <div className="text-danger">{error}</div>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit} disabled={sending}>
          {sending ? 'Sending...' : 'Send'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmailModal;