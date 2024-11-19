import { Container } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="bg-light py-4 mt-auto">
      <Container className="text-center">
        <p className="mb-1">© 2024 Your App Name. All rights reserved.</p>
        <p className="text-muted small">
          <a href="/privacy" className="text-decoration-none me-3">Privacy Policy</a>
          <a href="/terms" className="text-decoration-none me-3">Terms of Service</a>
          <a href="/contact" className="text-decoration-none">Contact Us</a>
        </p>
      </Container>
    </footer>
  );
};
