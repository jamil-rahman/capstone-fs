import React from 'react';
import { Card } from 'react-bootstrap';
import { Brain } from 'lucide-react';

const TypingIndicator = () => (
  <Card className="mb-4">
    <Card.Body>
      <div className="d-flex align-items-center gap-3">
        <Brain className="animate-pulse" size={24} />
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span className="text-muted">Analyzing city data...</span>
      </div>
    </Card.Body>
  </Card>
);

export default TypingIndicator;