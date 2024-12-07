import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import TyperWriterEffect from '../common/TypeWriterEffect';

const InsightCard = ({ title, content, startTyping }) => {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const handleTypeWriterComplete = () => {
    if (currentItemIndex < content.length - 1) {
      setCurrentItemIndex(prev => prev + 1);
    }
  };

  return (
    <Card className="mb-4">
      <Card.Header>
        <h5 className="mb-0">{title}</h5>
      </Card.Header>
      <Card.Body>
        <ul className="list-unstyled mb-0">
          {content.map((item, index) => (
            <li key={index} className="mb-2">
              {index <= currentItemIndex && startTyping && (
                <TyperWriterEffect 
                  text={item.replace(/^- /, '')} 
                  speed={4}
                  onComplete={handleTypeWriterComplete}
                />
              )}
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
};

export default InsightCard