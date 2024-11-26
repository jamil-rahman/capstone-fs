import React from 'react';
import { Card } from 'react-bootstrap';
import { MapPin } from 'lucide-react';

const Trivia = ({ trivia }) => {
  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Body>
        <div className="mb-3">
          <div className="d-flex align-items-center gap-2 text-primary mb-2">
            <MapPin size={16} />
            <span className="fw-medium">{trivia.location}</span>
          </div>
          <h5 className="fw-semibold text-dark mb-2">
            {trivia.title}
          </h5>
          <p className="text-muted small mb-0">
            {trivia.description}
          </p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Trivia;